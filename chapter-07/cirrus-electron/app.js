'use strict';

// Dependencies
//
var electron 		= require('electron');
var Menu    		= electron.remote.Menu;
var MenuItem  	= electron.remote.MenuItem;
var ipc     		= electron.ipcRenderer;
var dialog    	= electron.remote.dialog;
var designMenu 	= require('./designMenu');
var currentFile;
var content;
var tabWas;
var done;

ipc.on('fileRead', function (event, err, data) {
	loadMenu(true);
	if (err) throw(err);
	if (!done) bindClickingOnTabs();
	hideSelectFileButton();
	setContent(data);
	showViewMode('design');
});

ipc.on('fileSaved', function (event, err) {
	if (err) return alert('There was an error saving the file');
	alert('File Saved');
});

function openFile (cb) {
	dialog.showOpenDialog(function (files) {
			ipc.send('readFile', files);
			if (files) currentFile = files[0];
			if (cb && typeof cb === 'function') cb();
	});
}

function saveFile () {
	ipc.send('saveFile', currentFile, content);
}

function loadMenu (enableSaveOption) {
	var template = [
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

function hideDiv (div) {
	if (!div.classList.contains('hidden')) div.classList.add('hidden');
}

function showViewMode (viewMode) {
	var areaDivs = document.querySelectorAll('.area');
	for (var i; i<areaDivs.length; i++) {
		var areaDiv = areaDivs[i];
		hideDiv(areaDiv);
	};
	var selectedArea = document.querySelector(`#${viewMode}Area`);
	selectedArea.classList.remove('hidden');
	tabWas = viewMode;
}

function setContent (changedContent) {
	if (changedContent) { content = changedContent; }
	var designArea = document.querySelector('#designArea');
	designArea.innerHTML = content;
	var codeArea = document.querySelector('#codeArea');
	codeArea.value = content;
	var previewArea = document.querySelector('#previewArea');
	previewArea.innerHTML = content;
}

function bindClickingOnTab (tabDiv) {
	tabDiv.addEventListener('click', function () {
		var id = tabDiv.id;
		if (tabWas) {
			var contentDiv = document.querySelector(`#${tabWas}Area`);
			if (tabWas === 'design') setContent(contentDiv.innerHTML);
			if (tabWas === 'code') setContent(contentDiv.value);
		}
		showViewMode(id);
	});
}

function bindClickingOnTabs() {
	var tabs = document.querySelectorAll('.tab');
	done = true;
	for (var i; i<tabs.length; i++) {
		var tab = tabs[i];
		bindClickingOnTab(tab);
	}
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
