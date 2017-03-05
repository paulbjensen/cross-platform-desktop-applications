'use strict';

// Dependencies
//
const electron 		= require('electron');
const Menu    		= electron.remote.Menu;
const MenuItem  	= electron.remote.MenuItem;
const ipc     		= electron.ipcRenderer;
const dialog    	= electron.remote.dialog;
const designMenu 	= require('./designMenu');
let currentFile;
let content;
let tabWas;
let done;

ipc.on('fileRead', (event, err, data) => {
	loadMenu(true);
	if (err) throw(err);
	if (!done) bindClickingOnTabs();
	hideSelectFileButton();
	setContent(data);
	showViewMode('design');
});

ipc.on('fileSaved', (event, err) => {
	if (err) return alert('There was an error saving the file');
	alert('File Saved');
});

function openFile (cb) {
	dialog.showOpenDialog((files) => {
		ipc.send('readFile', files);
		if (files) currentFile = files[0];
		if (cb && typeof cb === 'function') cb();
	});
}

function saveFile () {
	ipc.send('saveFile', currentFile, content);
}

function loadMenu (enableSaveOption) {
	const template = [
	  {
	    label: 'File',
	    submenu: [
	      {
	        label: 'Open File',
	        click: openFile
	      }
	    ]
	  }
	];

	if (enableSaveOption) {
		template[0].submenu.push({
			label: 'Save File',
			click: saveFile
		});
	}

	const menu = Menu.buildFromTemplate(template);
	Menu.setApplicationMenu(menu);
}

function bindSelectFileClick (cb) {
	const button = document.querySelector('#openFileView div');
	button.addEventListener('click', () => {
		openFile(cb);
	});
}

function hideSelectFileButton () {
	const button = document.querySelector('#openFileView');
	button.classList.add('hidden');
	const appView = document.querySelector('#appView');
	appView.classList.remove('hidden');
}

function hideDiv (div) {
	if (!div.classList.contains('hidden')) div.classList.add('hidden');
}

function showViewMode (viewMode) {
	const areaDivs = document.querySelectorAll('.area');
	areaDivs.forEach(hideDiv);
	const selectedArea = document.querySelector(`#${viewMode}Area`);
	selectedArea.classList.remove('hidden');
	tabWas = viewMode;
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

function bindClickingOnTab (tabDiv) {
	tabDiv.addEventListener('click', () => {
		const id = tabDiv.id;
		if (tabWas) {
			const contentDiv = document.querySelector(`#${tabWas}Area`);
			if (tabWas === 'design') setContent(contentDiv.innerHTML);
			if (tabWas === 'code') setContent(contentDiv.value);
		}
		showViewMode(id);
	});
}

function bindClickingOnTabs() {
	const tabs = document.querySelectorAll('.tab');
	done = true;
	tabs.forEach(bindClickingOnTab);
}

function bindOnDesignView() {
	designMenu();
}

function initialize () {
	loadMenu();
	bindSelectFileClick();
	bindOnDesignView();
}

window.onload = initialize;
