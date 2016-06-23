'use strict';

function initialize () {
	let notes = window.localStorage.notes;
	if (!notes) notes = 'Let me remember...';
	window.document.querySelector('textarea').value = notes;
}

function saveNotes () {
	let notes = window.document.querySelector('textarea').value;
	window.localStorage.setItem('notes',notes);
}

window.onload = initialize;