'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow = null;

app.on('window-all-closed',() => {
  if (process.platform !== 'darwin') app.quit();
});

let appPath = app.getAppPath();
if (process.env.NODE_ENV === 'test') appPath = process.cwd();

app.on('ready', () => {
  mainWindow = new BrowserWindow();
  mainWindow.loadURL(`file://${appPath}/index.html`);
  mainWindow.on('closed', () => { mainWindow = null; });
});
