'use strict';

const Application = require('spectron').Application;
const assert = require('assert');
const path = require('path');
const osenv = require('osenv');

let app;
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

    let documentsFilePath = path.join(osenv.home(),'/Documents');

    this.timeout(10000);
    app.start().then(() => {
      return app.browserWindow.isVisible();
    }).then((isVisible) => {
      assert.equal(isVisible, true);
    }).then(() => {
      return app.client.doubleClick(`//img[@data-filepath="${documentsFilePath}"]`);
    }).then(() => {
      return app.client.getText('#current-folder');
    }).then((currentFolder) => {
      assert.equal(documentsFilePath, currentFolder);
    })
    .then(finish)
    .catch(finish);
  });

});
