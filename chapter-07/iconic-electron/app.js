'use strict';

function stopDefaultEvent (event) {
	event.preventDefault();
	return false;
}

window.ondragover = stopDefaultEvent;
window.ondrop = stopDefaultEvent;

function displayImageInIconSet (filePath) {
	var images = window.document.querySelectorAll('#icons img');
	for (var i=0;i < images.length;i++) {
		images[i].src = filePath;
	}
}

function displayIconsSet () {
	var iconsArea = window.document.querySelector('#icons');
	iconsArea.style.display = 'block';
}

function interceptDroppedFile () {
	var interceptArea = window.document.querySelector('#load-icon-holder');
	interceptArea.ondrop = function (event) {
		event.preventDefault();
		if (event.dataTransfer.files.length !== 1) {
			window.alert('You have dragged too many files into the app. Drag just 1 file');
		} else {
			interceptArea.style.display = 'none';
			displayIconsSet();
			var file = event.dataTransfer.files[0];
			displayImageInIconSet(file.path);
		}
		return false;
	};
}

window.onload = function () {
	interceptDroppedFile();
};