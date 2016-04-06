'use strict';

var fileSystem = require('./fileSystem');
var userInterface = require('./userInterface');

function main() {
  var folderPath = fileSystem.getUsersHomeFolder();
  fileSystem.getFilesInFolder(folderPath, function (err, files) {
    if (err) return alert('Sorry, we could not load your home folder');
    fileSystem.inspectAndDescribeFiles(folderPath, files, userInterface.displayFiles);
  });
}

main();
