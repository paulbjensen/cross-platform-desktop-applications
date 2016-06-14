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
	//mainWindow.webContents.openDevTools();
});

function readFile (event, files) {
  if (files) {
    // We can only load one file in the app, so we select the first
    var filePath = files[0];
  	fs.readFile(filePath, 'utf8', function (err, data) {
      event.sender.send('fileRead', err, data);
  	});
  }
};

function saveFile (event, currentFile, content) {
  fs.writeFile(currentFile, content, function (err) {
		event.sender.send('fileSaved', err);
	});
}

// Handles reading the contents of a file
ipc.on('readFile', readFile);
ipc.on('saveFile', saveFile);
