'use strict';

// Dependencies
//
var assert = require('assert');
var fs = require('fs');
var osenv = require('osenv');
var path = require('path');
var wd = require('wd');
var WebdriverManager 	= require('webdriver-manager');

var stepDefinitions = function () {

	this.Given(/^I have the application open and running$/, {timeout: 20 * 1000}, function (callback) {
		var self = this;
		this.wm = new WebdriverManager();
		this.wm.start({closeOnStdinInput: false}, function (err) {
			if (err) { return callback.fail(err); }
			self.browser = wd.remote();
			self.browser.init({
			    browserName: 'chrome',
			    chromeOptions: {
			        binary: '/Users/pauljensen/.nvm/versions/node/v4.0.0/bin/nw'
			    }
			}, callback);
		});
	});

	this.When(/^I search for "([^"]*)"$/, function (term, callback) {
		this.browser.elementById('search', function (err,element) {
			assert.equal(null, err);
			element.type(term, callback);
		});
	});

	this.When(/^I double click on the "([^"]*)" folder$/, function (folderName, callback) {
		var folderPath = path.join(osenv.home(),folderName);
		this.browser.elementByXPath('//img[contains(@data-filepath,"' + folderPath + '")]', function (err, element) {
			element.doubleClick(callback);
		});
	});

	this.When(/^I double click on "([^"]*)"$/, function (fileName, callback) {
		this.browser.elementByXPath('//div[contains(text(),"' + fileName + '")]/..', function (err, element) {
			element.doubleClick(callback);
		});
	});

	this.Then(/^I should see the "([^"]*)" file opened in a photo app$/, function (filePath, callback) {
		setTimeout(function () {
			fs.stat(filePath, function (err, stat) {
				var timeDifference = Date.now() - stat.atime.getTime();
				assert.equal(null, err);
				assert(timeDifference < 3000);
				callback(err);
			});
		}, 3000);
	});

	this.When(/^I wait (\d+) seconds$/, function (numberOfSeconds, callback) {
  		setTimeout(callback, numberOfSeconds*1000);
	});

};

module.exports = stepDefinitions;
