'use strict';

var ipcRenderer =require('electron').ipcRenderer;

function search () {
  var formInput = window.document.querySelector('form input');
  var term = formInput.value;
  ipcRenderer.send('monitorTerm', term);
  return false;
}