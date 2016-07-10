'use strict';

var Application = require('spectron').Application;
var assert = require('assert');
var path = require('path');

var app;
let electronPath = path.join(__dirname, '../node_modules/.bin/electron');
let entryPointPath = path.join(__dirname, '../main.js');
if (process.platform === 'win32') electronPath += '.cmd';

describe('exploring folders', () => {

  beforeEach(() => {
		return app = new Application({
		  path: electronPath,
			args: [entryPointPath]
		});
	});

	it('should allow the user to navigate folders by double-clicking on them', function (done) {

		function finish (error) {
			app.stop();
			return done(error);
		}

    this.timeout(10000);
		app.start().then(() => {
		  return app.browserWindow.isVisible();
		}).then((isVisible) => {
		  assert.equal(isVisible, true);
		}).then(() => {
		  return app.client.getTitle();
		}).then((title) => {
		  assert.equal(title, 'Lorikeet');
		})
		.then(() => {
			return app.client.doubleClick('//div[contains(text(),"Documents")]')
		})
		.then((result) => {
			setTimeout(function () {
				console.log(result);
				return null;
			}, 3000);
		})
		.then(finish)
		.catch(finish);
	});

});
