'use strict';



// Dependencies
//
var fs 			= require('fs');
var gui 		= require('nw.gui');
var designMenu 	= require('./designMenu');
var currentFile;
var content;


function openFile () {
	openFileDialog(function (filePath) {
		fs.readFile(filePath, function (err, data) {
			setContent(data);
			hideSelectFileButton();
			showViewMode('design');
		});
	});
}



function saveFile () {
	fs.writeFile(currentFile, content, function (err) {
		if (err) {
			alert('There was an error');
		}
	});
}



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
		loadMenu();
		fs.readFile(filePath, function (err, data) {
			setContent(data);
			hideSelectFileButton();
			showViewMode('design');
		});
	});
	designMenu(window, gui);
}



window.onload = initialize;
