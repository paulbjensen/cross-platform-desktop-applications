'use strict';

// Dependencies
//
let fs = require('fs');
let photoData;

function bindSavingPhoto () {
  let saveFile = window.document.querySelector('#saveFile');
  saveFile.addEventListener('change', function () {
    let filePath = this.value;
    fs.writeFile(filePath, photoData, 'base64', function (err) {
      if (err) alert('There was a problem saving the photo:', err.message);
      photoData = null;
    });
  });
}

function initialize () {

  let errorCallback = function (error) {
    console.log('There was an error connecting to the video stream:', error);
  };

  window.navigator.webkitGetUserMedia({video: true}, function (localMediaStream) {
    let video = window.document.querySelector('video');
    video.src = window.URL.createObjectURL(localMediaStream);
    video.onloadedmetadata = bindSavingPhoto;
  }, errorCallback);

}

function takePhoto () {
  let saveFile  = window.document.querySelector('#saveFile');
  let canvas    = window.document.querySelector('canvas');
  let video     = window.document.querySelector('video');
  canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth/2, video.videoHeight/2);
  photoData = canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
  saveFile.click();
}

window.onload = initialize;