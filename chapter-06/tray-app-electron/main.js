'use strict';

var electron = require('electron');
var app = electron.app;
var Menu = electron.Menu;
var Tray = electron.Tray;
var BrowserWindow = electron.BrowserWindow;

var appIcon = null;
var mainWindow = null;

var notes = [
	{
		title: 'todo list',
		contents: 'grocery shopping\npick up kids\nsend birthday party invites'},
	{
		title: 'grocery list',
		contents: 'Milk\nEggs\nButter\nDouble Cream'},
	{
		title: 'birthday invites',
		contents: 'Dave\nSue\nSally\nJohn and Joanna\nChris and Georgina\nElliot'
	}
];

function displayNote (note) {
	return function () {
		
	}
}

function addNoteToMenu (note) {
	return { label: note.title, type: 'normal', click: displayNote(note) };
}

app.on('ready', function () {
  appIcon = new Tray('icon@2x.png');
  var contextMenu = Menu.buildFromTemplate(notes.map(addNoteToMenu));
  appIcon.setToolTip('Notes app');
  appIcon.setContextMenu(contextMenu);
});
