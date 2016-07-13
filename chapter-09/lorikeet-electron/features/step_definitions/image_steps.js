'use strict';

// Dependencies
//
var assert = require('assert');
var fs = require('fs');
var osenv = require('osenv');
var path = require('path');

var stepDefinitions = function () {

  this.Given(/^I have the application open and running$/, {timeout: 20 * 1000}, function (callback) {
    var self = this;

    self.app.start().then(() => {
      return self.app.browserWindow.isVisible();
    }).then((isVisible) => {
      assert.equal(isVisible, true);
      callback();
    })

  });

  this.When(/^I search for "([^"]*)"$/, function (term, callback) {
    this.app.client.setValue('#search', term)
    .then(() => { callback(); });
  });

  this.When(/^I double click on the "([^"]*)" folder$/, function (folderName, callback) {
    var folderPath = path.join(osenv.home(),folderName);
    this.app.client.doubleClick(`//img[@data-filepath="${folderPath}"]`)
    .then(() => { callback(); });
  });

  this.When(/^I double click on "([^"]*)"$/, function (fileName, callback) {
    var filePath = path.join(osenv.home(),fileName);
    this.app.client.doubleClick(`//img[@data-filepath="${filePath}"]`)
    .then(() => { callback(); });
  });

  this.Then(/^I should see the "([^"]*)" file opened in a photo app$/, function (fileName, callback) {
    var filePath = path.join(osenv.home(),fileName);
    setTimeout(function () {
      fs.stat(filePath, function (err, stat) {
        var timeDifference = Date.now() - stat.atime.getTime();
        assert.equal(null, err);
        assert(timeDifference < 3000);
        callback(err);
      });
    }, 3000);
  });

  this.When(/^I wait (\d+) seconds$/, (numberOfSeconds, callback) => {
      setTimeout(callback, numberOfSeconds * 1000);
  });

};

module.exports = stepDefinitions;