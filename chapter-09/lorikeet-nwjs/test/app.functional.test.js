'use strict';

let assert = require('assert');
let wd = require('wd');
let WebdriverManager = require('webdriver-manager');
var wm, browser;

describe('app', () => {

  describe('toolbar', () => {
    describe('search field', () => {
      describe('when searching for a file', () => {

        before(function (done) {

          this.timeout(50000);
          wm = new WebdriverManager();

          wm.start({closeOnStdinInput: false}, (err) => {
            if (err) return done(err);
            browser = wd.remote();
            browser.init({
              browserName: 'chrome',
              chromeOptions: {
                binary: 'C:\\Program Files\\nodejs\\node.EXE',
              }
            }, function (err) {
              console.log('got here');
              done(err);
            });
          });
        });

        it('should filter the files that are displayed in the main area');
      });
    });
  });

  after((done) => {
    browser.done(function () {
      wm.stop(done);
    });
  });

});
