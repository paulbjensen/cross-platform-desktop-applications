'use strict';

var fileSystem = require('./fileSystem');
var userInterface = require('./userInterface');

function main() {
  var folderPath = fileSystem.getUsersHomeFolder();
  userInterface.loadDirectory(folderPath)();
}

window.onload = main;
