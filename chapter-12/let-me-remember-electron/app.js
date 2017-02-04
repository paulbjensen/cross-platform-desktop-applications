'use strict';

const electron = require('electron');
const app = electron.remote.app;

function initialize () {
	let notes = window.localStorage.notes;
	if (!notes) notes = 'Let me remember...';
	window.document.querySelector('textarea').value = notes;
}

function saveNotes () {
	let notes = window.document.querySelector('textarea').value;
	window.localStorage.setItem('notes',notes);
}

function quit () { app.quit(); }

window.onload = initialize;