'use strict';

// Dependencies
//
var electron 	= require('electron');
var Menu    	= electron.remote.Menu;
var ipc     	= electron.ipcRenderer;
var dialog    = electron.remote.dialog;
var currentFile;
var content;

ipc.on('fileRead', function (event, err, data) {
	if (err) throw(err);
	hideSelectFileButton();
	showViewMode('design');
});

ipc.on('fileSaved', function (err) {
	if (err) alert('There was an error saving the file');
});

function openFile (cb) {
	dialog.showOpenDialog(function (filePath) {
			ipc.send('readFile', filePath);
			if (cb && typeof cb === 'function') cb();
	});
}

function saveFile () {
	ipc.send('saveFile', currentFile, content);
}

function loadMenu () {
	var template = [
	  {
	    label: 'File',
	    submenu: [
	      {
	        label: 'Open File',
	        click: openFile
	      },
	      {
	        label: 'Save',
	        click: saveFile
	      }
	    ]
	  }
	];

	var menu = Menu.buildFromTemplate(template);
	Menu.setApplicationMenu(menu);
}

function bindSelectFileClick (cb) {
	var button = document.querySelector('#openFileView div');
	button.addEventListener('click', function () {
		openFile(cb);
	});
}

function hideSelectFileButton () {
	var button = document.querySelector('#openFileView');
	button.classList.add('hidden');
	var appView = document.querySelector('#appView');
	appView.classList.remove('hidden');
}

function showViewMode (viewMode) {
	var areaDivs = window.document.querySelectorAll('.area');
	for (var i=0;i<areaDivs.length;i++) {
		var areaDiv = areaDivs[i];
		if (!areaDiv.classList.contains('hidden')) {
			areaDiv.classList.add('hidden');
		}
	}
	var selectedArea = window.document.querySelector('#' + viewMode + 'Area');
	selectedArea.classList.remove('hidden');
}

function setContent (changedContent) {
	if (changedContent) { content = changedContent; }
	var designArea = window.document.querySelector('#designArea');
	designArea.innerHTML = content;
	var codeArea = window.document.querySelector('#codeArea');
	codeArea.value = content;
	var previewArea = window.document.querySelector('#previewArea');
	previewArea.innerHTML = content;
}

function initialize () {
	bindSelectFileClick(loadMenu);
}

window.onload = initialize;