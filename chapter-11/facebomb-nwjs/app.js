'use strict';

const fs = require('fs');
let photoData;
let saveFile;
let video;

function bindSavingPhoto () {
  saveFile.addEventListener('change', function () {
    let filePath = this.value;
    fs.writeFile(filePath, photoData, 'base64', (err) => {
      if (err) alert('There was a problem saving the photo:', err.message);
      photoData = null;
    });
  });
}

function initialize () {
  saveFile = window.document.querySelector('#saveFile');
  video = window.document.querySelector('video');

  let errorCallback = (error) => {
    console.log('There was an error connecting to the video stream:', error);
  };

  window.navigator.webkitGetUserMedia({video: true}, (localMediaStream) => {
    video.src = window.URL.createObjectURL(localMediaStream);
    video.onloadedmetadata = bindSavingPhoto;
  }, errorCallback);
}

function takePhoto () {
  let canvas = window.document.querySelector('canvas');
  canvas.getContext('2d').drawImage(video, 0, 0, 800, 600);
  photoData = canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
  saveFile.click();
}

window.onload = initialize;
