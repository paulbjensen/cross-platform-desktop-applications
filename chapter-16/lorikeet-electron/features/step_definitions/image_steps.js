'use strict';

// Dependencies
//
const assert = require('assert');
const fs = require('fs');
const osenv = require('osenv');
const path = require('path');
const {defineSupportCode} = require('cucumber');

defineSupportCode(
	function({Then, When, Given}) {

		Given(/^I have the application open and running$/, {timeout: 20 * 1000}, function (callback) {
	    const self = this;

	    self.app.start().then(() => {
	      return self.app.browserWindow.isVisible();
	    }).then((isVisible) => {
	      assert.equal(isVisible, true);
	      callback();
	    })

	  });

	  When(/^I search for "([^"]*)"$/, function (term, callback) {
	    this.app.client.setValue('#search', term)
	    .then(() => { callback(); });
	  });

	  When(/^I double click on the "([^"]*)" folder$/, function (folderName, callback) {
	    const folderPath = path.join(osenv.home(),folderName);
	    this.app.client.doubleClick(`//img[@data-filepath="${folderPath}"]`)
	    .then(() => { callback(); });
	  });

	  When(/^I double click on "([^"]*)"$/, function (fileName, callback) {
	    const filePath = path.join(osenv.home(),fileName);
	    this.app.client.doubleClick(`//img[@data-filepath="${filePath}"]`)
	    .then(() => { callback(); });
	  });

	  Then(/^I should see the "([^"]*)" file opened in a photo app$/, function (fileName, callback) {
	    const filePath = path.join(osenv.home(),fileName);
	    setTimeout(function () {
	      fs.stat(filePath, function (err, stat) {
	        const timeDifference = Date.now() - stat.atime.getTime();
	        assert.equal(null, err);
	        assert(timeDifference < 3000);
	        callback(err);
	      });
	    }, 3000);
	  });

	  When(/^I wait (\d+) seconds$/, (numberOfSeconds, callback) => {
	      setTimeout(callback, numberOfSeconds * 1000);
	  });

	}
);
