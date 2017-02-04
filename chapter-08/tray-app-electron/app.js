function displayNote(event, note) {
  document.getElementById('title').innerText = note.title;
  document.getElementById('contents').innerText = note.contents;
}

const ipc = require('electron').ipcRenderer;
ipc.on('displayNote', displayNote);
