'use strict';

var gui = require('nw.gui');

var mb = new gui.Menu({ type: 'menubar' });
mb.createMacBuiltin('Mac app menu example');

gui.Window.get().menu = mb;
