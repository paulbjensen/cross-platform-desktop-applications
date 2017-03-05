'use strict';



// Dependencies
//
const fs 			= require('fs');
const gui 		= require('nw.gui');
const designMenu 	= require('./designMenu');
let currentFile;
let content;

const beetle = require('./beetle');


function openFile () {
	openFileDialog((filePath) => {
		fs.readFile(filePath, (err, data) => {
			setContent(data);
			hideSelectFileButton();
			showViewMode('design');
		});
	});
}



function saveFile () {
	fs.writeFile(currentFile, content, (err) => {
		if (err) {
			alert('There was an error');
		}
	});
}



function loadMenu () {

	const menuBar = new gui.Menu({type:'menubar'});

	// Create sub-menu
	const menuItems = new gui.Menu();

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
	const inputField = document.querySelector('#fileSelector');
	inputField.addEventListener('change', function () {
		const filePath = this.value;
		currentFile = filePath;
		cb(filePath);
	});
	inputField.click();
}



function bindSelectFileClick (cb) {
	const button = document.querySelector('#openFileView div');
	button.addEventListener('click', () => {
		openFileDialog(cb);
	});
}



function hideSelectFileButton () {
	const button = document.querySelector('#openFileView');
	button.classList.add('hidden');
	const appView = document.querySelector('#appView');
	appView.classList.remove('hidden');
}



function showViewMode (viewMode) {
	const areaDivs = document.querySelectorAll('.area');
	for (let i=0;i<areaDivs.length;i++) {
		let areaDiv = areaDivs[i];
		areaDiv.classList.add('hidden');
	}
	const selectedArea = document.querySelector(`#${viewMode}Area`);
	selectedArea.classList.remove('hidden');
}



function setContent (changedContent) {
	if (changedContent) { content = changedContent; }
	const designArea = document.querySelector('#designArea');
	designArea.innerHTML = content;
	const codeArea = document.querySelector('#codeArea');
	codeArea.value = content;
	const previewArea = document.querySelector('#previewArea');
	previewArea.innerHTML = content;
}

function initialize () {
	bindSelectFileClick((filePath) => {
		loadMenu();
		fs.readFile(filePath, (err, data) => {
			setContent(data);
			hideSelectFileButton();
			showViewMode('design');
		});
	});
	designMenu(window, gui);
}



window.onload = initialize;
