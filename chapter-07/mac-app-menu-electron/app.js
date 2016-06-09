'use strict';

var electron = require('electron');
var defaultMenu = require('electron-default-menu');
var Menu = electron.remote.Menu;

var menu = Menu.buildFromTemplate(defaultMenu());
Menu.setApplicationMenu(menu);
