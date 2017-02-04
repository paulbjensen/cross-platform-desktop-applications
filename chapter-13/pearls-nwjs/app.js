'use strict';

const gui = require('nw.gui');
const clipboard = gui.Clipboard.get();
const phrases = require('./phrases');
let phrasesArea;
let template;

function addPhrase (phrase) {
  template.content.querySelector('div').innerText = phrase;
  let clone = window.document.importNode(template.content, true);
  phrasesArea.appendChild(clone);
}

function loadPhrasesIntoApp () {
  phrasesArea = window.document.getElementById('phrases');
  template = window.document.querySelector('#phrase');
  phrases.forEach(addPhrase);
}

function copyPhraseToClipboard (phrase) {
  clipboard.set(phrase, 'text');
}

window.onload = loadPhrasesIntoApp;
