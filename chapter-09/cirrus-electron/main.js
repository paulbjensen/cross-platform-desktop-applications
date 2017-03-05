'use strict';

const electron = require('electron');
const fs = require('fs');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipc = electron.ipcMain;
let mainWindow = null;

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('ready', () => {
  mainWindow = new BrowserWindow();
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.on('closed', () => { mainWindow = null; });
});

function readFile (event, files) {
  if (files) {
    // We can only load one file in the app, so we select the first
    const filePath = files[0];
  	fs.readFile(filePath, 'utf8', (err, data) => {
      event.sender.send('fileRead', err, data);
  	});
  }
};

function saveFile (event, currentFile, content) {
  fs.writeFile(currentFile, content, (err) => {
		event.sender.send('fileSaved', err);
	});
}

// Handles reading the contents of a file
ipc.on('readFile', readFile);
ipc.on('saveFile', saveFile);
