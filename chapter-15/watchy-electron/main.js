'use strict';

const {app, ipcMain, BrowserWindow} = require('electron');
const notifier = require('electron-notifications');
var config = require('./config');
var Twitter = require('twitter');
var client = new Twitter(config);

let mainWindow = null;

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('monitorTerm', (event, term) => {
  client.stream('statuses/filter', {track: term}, (stream) => {
	  stream.on('data', (tweet) => {
      let notification = notifier.notify('New tweet', {
        icon: tweet.user.profile_image_url,
        message: tweet.text
      });
    });
		stream.on('error', (error) => {
		  console.log(error.message);
	  });
	});
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 370,
    height: 90,
    useContentSize: true
  });
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.on('closed', () => { mainWindow = null; });
});
