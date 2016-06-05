'use strict';

var electron = require('electron');
var Menu  = electron.remote.Menu;
var name = electron.remote.app.getName();

var template = [{
	label: '', // Gets overridden by Electron
	submenu: [
	  {
	    label: 'About ' + name,
	    role: 'about'
	  },
    {
      type: 'separator'
    },
    {
      label: 'Quit',
      accelerator: 'Command+Q',
      click: electron.remote.app.quit
    }
	]
}];

var menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
