'use strict';

const gui = require('nw.gui');

const mb = new gui.Menu({ type: 'menubar' });
mb.createMacBuiltin('Mac app menu example');
	
gui.Window.get().menu = mb;
