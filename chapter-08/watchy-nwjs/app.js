'use strict';

var Twitter = require('twitter');
var config	= require('./config');
var term;
var client = new Twitter(config);

var notify = chrome.notifications.create;

function notifyOfTweet (tweet) {
	notify({
		icon: tweet.user.profile_image_url,
		body: tweet.text
	});
}

function search () {
	var formInput = window.document.querySelector('form input');
	term = formInput.value;
	client.stream('statuses/filter', {track: term}, function (stream) {
		alert('Subscribed to stream');
	  stream.on('data', notifyOfTweet);
		stream.on('error', function (error) {
		  alert(error.message);
	  });
	});
	return false;
}