'use strict';

const electron = require('electron');
const Menu  = electron.remote.Menu;
const name = electron.remote.app.getName();

const template = [{
     label: '',
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

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
