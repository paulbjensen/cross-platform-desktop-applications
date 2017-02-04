'use strict';

const electron = require('electron');
const dialog = electron.remote.dialog;
const fs = require('fs');
let photoData;
let video;

function savePhoto (filePath) {
  if (filePath) {
    fs.writeFile(filePath, photoData, 'base64', (err) => {
      if (err) alert(`There was a problem saving the photo: ${err.message}`);
      photoData = null;
    });
  }
}

function initialize () {
  video = window.document.querySelector('video');
  let errorCallback = (error) => {
    console.log(`There was an error connecting to the video stream: ${error.message}`);
  };

  window.navigator.webkitGetUserMedia({video: true}, (localMediaStream) => {
    video.src = window.URL.createObjectURL(localMediaStream);
  }, errorCallback);
}

function takePhoto () {
  let canvas = window.document.querySelector('canvas');
  canvas.getContext('2d').drawImage(video, 0, 0, 800, 600);
  photoData = canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
  dialog.showSaveDialog({
    title: "Save the photo",
    defaultPath: 'myfacebomb.png',
    buttonLabel: 'Save photo'
  }, savePhoto);
}

window.onload = initialize;