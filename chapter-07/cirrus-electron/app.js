'use strict';

// Dependencies
//
var electron 	= require('electron');
var Menu    	= electron.Menu;
var ipc     	= electron.ipcRenderer;
var dialog    = electron.remote.dialog;
var currentFile;
var content;

ipc.on('fileRead', function (err, data) {
	setContent(data);
	hideSelectFileButton();
	showViewMode('design');
});

ipc.on('fileSaved', function (err) {
	if (err) alert('There was an error');
});

function openFile () {
	dialog.showOpenDialog({
		properties: ['openFile'],
		filters: {name: 'HTML Files', extensions: ['htm', 'html']}
	}, function (files) {
		alert('HAPPENED');
		alert(files);
		var file = files[0];
		console.log(file);
	});

	// openFileDialog(function (filePath) {
	// 	ipc.send('readFile', filePath);
	// });
}

function saveFile () {
	ipc.send('saveFile', currentFile, content);
}

// TODO - replace with Electron's code equivalent for menu items
function loadMenu () {

	var menuBar = new gui.Menu({type:'menubar'});

	// Create sub-menu
	var menuItems = new gui.Menu();

	menuItems.append(new gui.MenuItem({ label: 'Open', click: openFile }));
	menuItems.append(new gui.MenuItem({ label: 'Save', click: saveFile }));


	if (process.platform === 'darwin') {

		// Load Mac OS X application menu
		menuBar.createMacBuiltin('Cirrus');

		menuBar.insert(
		    new gui.MenuItem({
		        label: 'File',
		        submenu: menuItems // menu elements from menuItems object
		    }), 1
		);

	} else {

		// Load Windows/Linux application menu
		menuBar.append(
		    new gui.MenuItem({
		        label: 'File',
		        submenu: menuItems // menu elements from menuItems object
		    }), 1
		);

	}

	gui.Window.get().menu = menuBar;

}

function openFileDialog (cb) {
	var inputField = document.querySelector('#fileSelector');
	inputField.addEventListener('change', function () {
		var filePath = this.value;
		currentFile = filePath;
		cb(filePath);
	});
	inputField.click();
}

function bindSelectFileClick (cb) {
	var button = document.querySelector('#openFileView div');
	button.addEventListener('click', function () {
		openFileDialog(cb);
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
		areaDiv.classList.add('hidden');
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
	bindSelectFileClick(function (filePath) {
		//loadMenu();
		ipc.send('readFile', filePath);
	});
}

window.onload = initialize;
