'use strict';

var gui			= require('nw.gui');
var clipboard 	= gui.Clipboard.get();
var phrases 	= require('./phrases');
var phrasesArea, template;

function addPhrase (phrase) {
	template.content.querySelector('div').innerText = phrase;
	var clone = window.document.importNode(template.content, true);
    phrasesArea.appendChild(clone);
}

function loadPhrasesIntoApp () {
	phrasesArea = window.document.getElementById('phrases');
	template 	= window.document.querySelector('#phrase');
	phrases.forEach(addPhrase);
}

function copyPhraseToClipboard (phrase) {
	clipboard.set(phrase, 'text');
}

window.onload = loadPhrasesIntoApp;