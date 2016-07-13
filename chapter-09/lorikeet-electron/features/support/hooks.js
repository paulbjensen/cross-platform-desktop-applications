'use strict';

var Application = require('spectron').Application;
var path = require('path');
let electronPath = path.join(__dirname, '../../node_modules/.bin/electron');
let entryPointPath = path.join(__dirname, '../../main.js');
if (process.platform === 'win32') electronPath += '.cmd';

var hooks = function () {

	this.Before(function (scenario, callback) {
    this.app = new Application({
      path: electronPath,
      args: [entryPointPath]
    });
    callback();
  });

	this.After(function (scenario, callback) {
		this.app.stop();
    callback();
	});

};

module.exports = hooks;
