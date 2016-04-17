'use strict';

var document;
var fileSystem = require('./fileSystem');
var search = require('./search');
var path = require('path');
var $ = require('jquery');

function displayFolderPath(folderPath) {
  $('#current-folder').html(convertFolderPathIntoLinks(folderPath));
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
  $('span.path').on('click', function (event) {
    var folderPath = $(event.target).attr('data-path');
    loadDirectory(folderPath)();
  });
}

module.exports = {
  displayFiles: displayFiles,
  loadDirectory: loadDirectory,
  bindSearchField: bindSearchField,
  filterResults: filterResults,
  resetFilter: resetFilter
};
