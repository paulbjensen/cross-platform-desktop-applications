'use strict';

var document;
var fileSystem = require('./fileSystem');
var search = require('./search');
var path = require('path');

function displayFolderPath(folderPath) {
  document.getElementById('current-folder')
    .innerHTML = convertFolderPathIntoLinks(folderPath);
  bindCurrentFolderPath();
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
  } else {
    clone.querySelector('img').addEventListener('dblclick', fileSystem.openFile(file.path), false);
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

  var items = document.getElementsByClassName('item');
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var filePath = item.getElementsByTagName('img')[0]
      .getAttribute('data-filepath');
    if (validFilePaths.indexOf(filePath) !== -1) {
      item.style = null;
    } else {
      item.style = 'display:none;';
    }
  }
}

function resetFilter() {
  var items = document.getElementsByClassName('item');
  for (var i = 0; i < items.length; i++) { items[i].style = null; }
}

function convertFolderPathIntoLinks(folderPath) {
  var folders = folderPath.split(path.sep);
  var contents	= [];
  var pathAtFolder = '';
  folders.forEach(function (folder) {
    pathAtFolder += folder + path.sep;
    contents.push(
      '<span class="path" data-path="' +
      pathAtFolder.slice(0, -1) + '">' +
      folder +
      '</span>'
    );
  });

  return contents.join(path.sep).toString();
}

function bindCurrentFolderPath() {
  var load = function (event) {
    var folderPath = event.target.getAttribute('data-path');
    loadDirectory(folderPath)();
  };

  var paths = document.getElementsByClassName('path');
  for (var i = 0; i < paths.length; i++) {
    paths[i].addEventListener('click', load, false);
  }
}

module.exports = {
  displayFiles: displayFiles,
  loadDirectory: loadDirectory,
  bindSearchField: bindSearchField,
  filterResults: filterResults,
  resetFilter: resetFilter
};
