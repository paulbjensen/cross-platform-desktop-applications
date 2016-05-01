var remote = require('electron').remote;

function toggleFullScreen() {
	var button = document.getElementById('fullscreen');
	var win = remote.getCurrentWindow();
	if (win.isFullScreen()) {
		win.setFullScreen(false);
		button.innerText = 'Go full screen';
	} else {
		win.setFullScreen(true);
		button.innerText = 'Exit full screen';
	}
}
