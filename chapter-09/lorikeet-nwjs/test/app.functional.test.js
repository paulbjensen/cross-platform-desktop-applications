'use strict';

let assert = require('assert');
let wd = require('wd');
let WebdriverManager = require('webdriver-manager');
const path = require('path');
var wm, browser;
let nw = require('nw');

describe('app', () => {

  describe('toolbar', () => {
    describe('search field', () => {
      describe('when searching for a file', () => {

        before(function (done) {

          this.timeout(20000);
          wm = new WebdriverManager();

          wm.start({closeOnStdinInput: true}, (err) => {
            if (err) return done(err);
            browser = wd.remote();
						let nwPath = path.join(__dirname, '../node_modules/.bin/nw');
						if (require('os').platform() === 'win32') { nwPath += '.cmd'; }
            browser.init({
              browserName: 'chrome',
              chromeOptions: {
                binary: nwPath
              }
            });
          });
        });


        it('should filter the files that are displayed in the main area', (done) => {

          browser.elementById('search', function (err,element) {
            assert.equal(null, err);
            element.type('docu', function (error) {
              assert.equal(null, error);
              browser.elementByXPath(
                '//div[contains(@class,"filename") and contains(text(),"Documents")]',
                   function (err, element) {
                  assert.equal(null, err);
                  element.isDisplayed(
        function (error, isDisplayed) {
                      assert.equal(null, error);
                      assert(isDisplayed);
              browser.elementByXPath(
            '//div[contains(@class,"filename") and contains(text(),".docker")]',
            function (err, element) {
                  assert.equal(null, err);
                  element.isDisplayed(
        function (error, isDisplayed) {
                assert.equal(null, error);
                assert(!isDisplayed);
                done();
              });
                });
                  }
              );
              });
            });
          });
          }
        );

      });
    });
  });

  after((done) => {
    wm.stop(done);
  });



});
