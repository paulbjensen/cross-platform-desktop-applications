'use strict';

var Application = require('spectron').Application;
var assert = require('assert');
var path = require('path');

var app;


describe('doing something for the app', () => {

  before(() => {
		app = new Application({
		  path: path.join(__dirname, '../node_modules/.bin/electron'),
			args: [path.join(__dirname, '../main.js')]
		});
	});

	it('should check that the app works as expected', (done) => {
		app.start().then(function () {
		  return app.browserWindow.isVisible();
		}).then(function (isVisible) {
		  assert.equal(isVisible, true);
		}).then(function () {
		  return app.client.getTitle();
		}).then(function (title) {
		  assert.equal(title, 'My App');
		}).then(function () {
		  return app.stop();
		}).catch(function (error) {
		  console.error('Test failed', error.message);
		}).then(done);
	});

});
