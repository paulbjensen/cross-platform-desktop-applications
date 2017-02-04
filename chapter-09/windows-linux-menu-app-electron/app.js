'use strict';

const electron = require('electron');
const Menu  = electron.remote.Menu;

const sayHello = () => { alert('Hello'); };

const quitTheApp = () => { electron.remote.app.quit(); };

const template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Say Hello',
        click: sayHello
      },
      {
        label: 'Quit the app',
        click: quitTheApp
      }
    ]
  }
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
