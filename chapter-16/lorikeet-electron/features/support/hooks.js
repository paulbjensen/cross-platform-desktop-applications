'use strict';

const Application = require('spectron').Application;
const path = require('path');
let electronPath = path.join(__dirname, '../../node_modules/.bin/electron');
const entryPointPath = path.join(__dirname, '../../main.js');
if (process.platform === 'win32') electronPath += '.cmd';
const {defineSupportCode} = require('cucumber');

defineSupportCode(function ({Before, After}) {

	Before(function (scenario, callback) {
    this.app = new Application({
      path: electronPath,
      args: [entryPointPath]
    });
    callback();
  });

	After(function (scenario, callback) {
		this.app.stop();
    callback();
	});

});
