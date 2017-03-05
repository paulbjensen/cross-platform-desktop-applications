'use strict';

let x;
let y;
let document;

function insertContent (content) {
	const range = document.caretRangeFromPoint(x, y);
	if (range) {
	  range.insertNode(content);
	}
}

function openImageFileDialog (cb) {
	const inputField = document.querySelector('#imageFileSelector');
	inputField.addEventListener('change', () => {
		const filePath = this.value;
		cb(filePath);
	});
	inputField.click();
}

function insertImage () {
	openImageFileDialog((filePath) => {
		if (filePath !== '') {
			const newImageNode = document.createElement('img');
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
	const youtubeURL = prompt('Please insert a YouTube url');
	if (youtubeURL) {
		const videoId = parseYoutubeVideo(youtubeURL);
		if (videoId) {
			const newIframeNode = document.createElement('iframe');
			newIframeNode.width = 854;
			newIframeNode.height = 480;
			newIframeNode.src = 'https://www.youtube.com/embed/' + videoId;
			newIframeNode.frameborder = 0;
			newIframeNode.allowfullscreen = true;
			insertContent(newIframeNode);
		}
	}
}

function initialize (window, gui) {

	if (!document) document = window.document;

 	const menu = new gui.Menu();

	menu.append(new gui.MenuItem({icon: 'picture.png', label: 'Insert image', click: insertImage }));
	menu.append(new gui.MenuItem({icon: 'youtube.png', label: 'Insert video', click: insertVideo }));

	document.querySelector('#designArea')
	.addEventListener('contextmenu', (event) => {
	  	event.preventDefault();
	  	x = event.x;
	  	y = event.y;
	  	menu.popup(event.x, event.y);
	  	return false;
	});

}

module.exports = initialize;
