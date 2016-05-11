var ipc = require('electron').ipcRenderer;

function displayNote(event, note) {
	document.getElementById('title').innerText = note.title;
	document.getElementById('contents').innerText = note.contents;
}

ipc.on('displayNote', displayNote);
