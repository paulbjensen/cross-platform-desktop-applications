'use strict';

var document = window.document;
var fileSystem = require('./fileSystem');
var search = require('./search');
var $ = require('jquery');

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
  return function () {
    search.resetIndex();
    displayFolderPath(folderPath);
    fileSystem.getFilesInFolder(folderPath, function (err, files) {
      clearView();
      if (err) return alert('Sorry, we could not load your folder');
      fileSystem.inspectAndDescribeFiles(folderPath, files, displayFiles);
    });
  };
}

function displayFile(file) {
  search.addToIndex(file);
  var mainArea = document.getElementById('main-area');
  var template = document.querySelector('#item-template');
  var clone = document.importNode(template.content, true);
  clone.querySelector('img').src = 'images/' + file.type + '.svg';
  clone.querySelector('img').setAttribute('data-filePath', file.path);
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

function bindSearchField(cb) {
  document.getElementById('search').addEventListener('keyup', cb, false);
}

function filterResults(results) {
  var validFilePaths = results.map(function (result) { return result.ref; });

  $('.item').each(function (index, item) {
    var filePath = $(item).find('img').attr('data-filePath');
    if (validFilePaths.indexOf(filePath) !== -1) {
      $(item).show();
    } else {
      $(item).hide();
    }
  });
}

function resetFilter() {
  $('.item').show();
}

module.exports = {
  displayFiles: displayFiles,
  loadDirectory: loadDirectory,
  bindSearchField: bindSearchField,
  filterResults: filterResults,
  resetFilter: resetFilter
};
