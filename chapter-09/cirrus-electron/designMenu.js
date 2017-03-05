'use strict';


var electron = require('electron');
var Menu    		= electron.remote.Menu;
var MenuItem  	= electron.remote.MenuItem;
var Dialogs 		= require('dialogs');
var dialogs = new Dialogs();

// Used to store the coordinates where
// the context menu was clicked
var x,y;



function insertContent (content) {
	var range = document.caretRangeFromPoint(x, y);
	if (range) {
	  range.insertNode(content);
	}
}


function openImageFileDialog (cb) {
	var inputField = document.querySelector('#imageFileSelector');
	inputField.addEventListener('change', function () {
		var filePath = this.value;
		cb(filePath);
	});
	inputField.click();
}



function insertImage () {
	openImageFileDialog(function (filePath) {
		if (filePath !== '') {
			var newImageNode = document.createElement('img');
			newImageNode.src = filePath;
			insertContent(newImageNode);
		}
	});
}



function parseYoutubeVideo (youtubeURL) {
	if (youtubeURL.indexOf('youtube.com/watch?v=') > -1) {
		return youtubeURL.split('watch?v=')[1];
	} else if (youtubeURL.match('https://youtu.be/') !== null) {
		return youtubeURL.split('https://youtu.be/')[1];
	} else if (youtubeURL.match('<iframe') !== null) {
		return youtubeURL.split('youtube.com/embed/')[1].split('"')[0];
	} else {
		alert('Unable to find a YouTube video id in the url');
		return false;
	}
}



function insertVideo () {
	dialogs.prompt('Please insert a YouTube url', (youtubeURL) => {
		if (youtubeURL) {
			var videoId = parseYoutubeVideo(youtubeURL);
			if (videoId) {
				var newIframeNode = document.createElement('iframe');
				newIframeNode.width = 854;
				newIframeNode.height = 480;
				newIframeNode.src = 'https://www.youtube.com/embed/' + videoId;
				newIframeNode.frameborder = 0;
				newIframeNode.allowfullscreen = true;
				setTimeout(() => {
					insertContent(newIframeNode);
				}, 300);
			}
		}
	});
}



function initialize () {
 	const menu = new Menu();

	menu.append(new MenuItem({label: 'Insert image', click: insertImage }));
	menu.append(new MenuItem({label: 'Insert video', click: insertVideo }));

	document.querySelector('#designArea')
	.addEventListener('contextmenu', function (event) {
	  	event.preventDefault();
	  	x = event.x;
	  	y = event.y;
	  	menu.popup(event.x, event.y);
	  	return false;
	});

}



module.exports = initialize;
