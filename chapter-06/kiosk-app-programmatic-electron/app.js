var remote = require('electron').remote;

function toggleKiosk() {
	var button = document.getElementById('kiosk');
	var win = remote.getCurrentWindow();
	if (win.isKiosk()) {
		win.setKiosk(false);
		button.innerText = 'Enter kiosk mode';
	} else {
		win.setKiosk(true);
		button.innerText = 'Exit kiosk mode';
	}
}
