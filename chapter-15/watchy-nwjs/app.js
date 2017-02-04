'use strict';

const Twitter = require('twitter');
const config  = require('./config');
var term;
const client = new Twitter(config);
let notify = Notification;

function notifyOfTweet (tweet) {
  new notify(`New tweet about ${term}`,
    {
      body: tweet.text,
      icon: tweet.user.profile_image_url
    }
  );
}

function search () {
  var formInput = window.document.querySelector('form input');
  term = formInput.value;
  client.stream('statuses/filter', {track: term}, (stream) => {
    stream.on('data', notifyOfTweet);
    stream.on('error', (error) => {
      alert(error.message);
    });
  });
  return false;
}
