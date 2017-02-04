'use strict';

const electron = require('electron');
const defaultMenu = require('electron-default-menu');
const Menu  = electron.remote.Menu;

const menu = Menu.buildFromTemplate(defaultMenu());
Menu.setApplicationMenu(menu);
