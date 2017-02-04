'use strict';

const async = require('async');
const fs = require('fs');
const osenv = require('osenv');
const path = require('path');

function getUsersHomeFolder() {
  return osenv.home();
}

function getFilesInFolder(folderPath, cb) {
  fs.readdir(folderPath, cb);
}

function inspectAndDescribeFile(filePath, cb) {
  let result = {
file: path.basename(filePath),
path: filePath, type: ''
  };
  fs.stat(filePath, (err, stat) => {
    if (err) {
      cb(err);
    } else {
      if (stat.isFile()) {
        result.type = 'file';
    	 }
      if (stat.isDirectory()) {
        result.type = 'directory';
      }
      cb(err, result);
    }
  });
}

function inspectAndDescribeFiles(folderPath, files, cb) {
  async.map(files, (file, asyncCb) => {
    let resolvedFilePath = path.resolve(folderPath, file);
    inspectAndDescribeFile(resolvedFilePath, asyncCb);
  }, cb);
}

function displayFile(file) {
  const mainArea = document.getElementById('main-area');
  const template = document.querySelector('#item-template');
  let clone = document.importNode(template.content, true);
  clone.querySelector('img').src = `images/${file.type}.svg`;
  clone.querySelector('.filename').innerText = file.file;
  mainArea.appendChild(clone);
}

function displayFiles(err, files) {
  if (err) {
    return alert('Sorry, we could not display your files');
  }
  files.forEach(displayFile);
}

function main() {
  let folderPath = getUsersHomeFolder();
  getFilesInFolder(folderPath, (err, files) => {
    if (err) {
      return alert('Sorry, we could not load your home folder');
    }
    inspectAndDescribeFiles(folderPath, files, displayFiles);
  });
}

main();
