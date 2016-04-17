'use strict';

var document;
var fileSystem = require('./fileSystem');

function displayFolderPath(folderPath) {
  document.getElementById('current-folder').innerText = folderPath;
}

function clearView() {
  var mainArea = document.getElementById('main-area');
  var firstChild = mainArea.firstChild;
  while (firstChild) {
    mainArea.removeChild(firstChild);
    firstChild = mainArea.firstChild;
  }
}

function loadDirectory(folderPath) {
  return function (window) {
		if (!document) document = window.document;
    displayFolderPath(folderPath);
    fileSystem.getFilesInFolder(folderPath, function (err, files) {
      clearView();
      if (err) return alert('Sorry, we could not load your folder');
      fileSystem.inspectAndDescribeFiles(folderPath, files, displayFiles);
    });
  };
}

function displayFile(file) {
  var mainArea = document.getElementById('main-area');
  var template = document.querySelector('#item-template');
  var clone = document.importNode(template.content, true);
  clone.querySelector('img').src = 'images/' + file.type + '.svg';
  if (file.type === 'directory') {
    clone.querySelector('img').addEventListener('dblclick', loadDirectory(file.path), false);
  }

  clone.querySelector('.filename').innerText = file.file;
  mainArea.appendChild(clone);
}

function displayFiles(err, files) {
  if (err) return alert('Sorry, we could not display your files');
  files.forEach(displayFile);
}

module.exports = {
  displayFiles: displayFiles,
  loadDirectory: loadDirectory
};
