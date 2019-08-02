'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow = null;

app.on('window-all-closed',() => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('ready', () => {
  // Extra configuration settings added due to issue, see 
  // https://github.com/paulbjensen/cross-platform-desktop-applications/issues/9
  mainWindow = new BrowserWindow({ webPreferences: { nodeIntegration: true } });
  mainWindow.loadURL(`file://${app.getAppPath()}/index.html`);
  mainWindow.on('closed', () => { mainWindow = null; });
});
