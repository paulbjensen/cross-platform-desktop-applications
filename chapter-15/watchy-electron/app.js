'use strict';

const {ipcRenderer} = require('electron');

function search () {
  const formInput = window.document.querySelector('form input');
  const term = formInput.value;
  ipcRenderer.send('monitorTerm', term);
  return false;
}
