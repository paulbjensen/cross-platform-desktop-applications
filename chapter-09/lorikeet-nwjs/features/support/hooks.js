'use strict';

var hooks = function () {

	this.Before(function (scenario, callback) {
		this.wd, this.browser;
    callback();
  });

	this.After(function (scenario, callback) {
		var self = this;
		self.browser.close(function () {
			self.browser.quit(callback);
		});
	});

};

module.exports = hooks;
