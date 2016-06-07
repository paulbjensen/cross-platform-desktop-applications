'use strict';

var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var ipc = electron.ipcMain;
var mainWindow = null;
var fs = require('fs');

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('ready', function () {
  mainWindow = new BrowserWindow();
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.on('closed', function () { mainWindow = null; });
});

function readFile (event, filePath) {
	fs.readFile(filePath, function (err, data) {
		ipc.emit('fileRead', err, data);
	});
};

// Handles reading the contents of a file
ipc.on('readFile', readFile);

ipc.on('saveFile', function (currentFile, content) {
	fs.writeFile(currentFile, content, function (err) {
		ipc.emite('fileSaved', err);
	});
});
