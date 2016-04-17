'use strict';

var async = require('async');
var fs = require('fs');
var osenv = require('osenv');
var path = require('path');
var shell;

try {
  shell = require('electron').shell;
} catch (err) {
  shell = window.require('nw.gui').Shell;
}

function getUsersHomeFolder() {
  return osenv.home();
}

function getFilesInFolder(folderPath, cb) {
  fs.readdir(folderPath, cb);
}

function inspectAndDescribeFile(filePath, cb) {
  var result = { file: path.basename(filePath), path: filePath, type: '' };
  fs.stat(filePath, function (err, stat) {
    if (err) cb(err);
    if (stat.isFile()) result.type = 'file';
    if (stat.isDirectory()) result.type = 'directory';
    cb(err, result);
  });
}

function inspectAndDescribeFiles(folderPath, files, cb) {
  async.map(files, function (file, internalCb) {
    var resolvedFilePath = path.resolve(folderPath, file);
    inspectAndDescribeFile(resolvedFilePath, internalCb);
  }, cb);
}

function openFile(filePath) {
  return function () {
    shell.openItem(filePath);
  };
}

module.exports = {
  getUsersHomeFolder: getUsersHomeFolder,
  getFilesInFolder: getFilesInFolder,
  inspectAndDescribeFiles: inspectAndDescribeFiles,
	openFile: openFile
};
