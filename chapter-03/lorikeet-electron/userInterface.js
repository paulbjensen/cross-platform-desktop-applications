'use strict';

function displayFile(file) {
  var document = window.document;
  var mainArea = document.getElementById('main-area');
  var template = document.querySelector('#item-template');
  var clone = document.importNode(template.content, true);
  clone.querySelector('img').src = 'images/' + file.type + '.svg';
  clone.querySelector('.filename').innerText = file.file;
  mainArea.appendChild(clone);
}

function displayFiles(err, files) {
  if (err) return alert('Sorry, we could not display your files');
  files.forEach(displayFile);
}

module.exports = {
  displayFiles: displayFiles
};
