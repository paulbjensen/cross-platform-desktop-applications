'use strict';

var electron = require('electron');
var Menu  = electron.remote.Menu;

var sayHello = function () {
  alert('Hello');
};

var quitTheApp = function () {
  electron.remote.app.quit();
};

var template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Say hello',
        click: sayHello
      },
      {
        label: 'Quit the app',
        click: quitTheApp
      }
    ]
  }
];

var menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
