'use strict';

var Twitter = require('twitter');
var config  = require('./config');
var term;
var client = new Twitter(config);
var notify = Notification;

function notifyOfTweet (tweet) {
  new notify('New tweet about ' + term,
    {
      body: tweet.text,
      icon: tweet.user.profile_image_url
    }
  );
}

function search () {
  var formInput = window.document.querySelector('form input');
  term = formInput.value;
  client.stream('statuses/filter', {track: term}, function (stream) {
    stream.on('data', notifyOfTweet);
    stream.on('error', function (error) {
      alert(error.message);
    });
  });
  return false;
}