'use strict';

const {app, globalShortcut, BrowserWindow} = require('electron');

let mainWindow = null;

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 840,
    height: 470,
    useContentSize: true
  });
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.on('closed', () => { mainWindow = null; });
  const pauseKey = globalShortcut.register('CommandOrControl+P', () => {
    mainWindow.webContents.send('togglePauseState');
  });
  if (!pauseKey) alert('You will not be able to pause the game from the keyboard');
});

app.on('will-quit', () => {
  globalShortcut.unregister('CommandOrControl+P');
});