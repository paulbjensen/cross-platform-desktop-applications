'use strict';

// Dependencies
//
let fs = require('fs');
let photoData;
let saveFile;
let video;

// http://electron.atom.io/docs/api/dialog/#dialogshowsavedialogbrowserwindow-options-callback
//
// This is what will need to be implemented

function bindSavingPhoto () {
  saveFile.addEventListener('change', () => {
    let filePath = this.value;
    fs.writeFile(filePath, photoData, 'base64', (err) => {
      if (err) alert(`There was a problem saving the photo: ${err.message}`);
      photoData = null;
    });
  });
}

function initialize () {
  saveFile = window.document.querySelector('#saveFile');
  video = window.document.querySelector('video');
  let errorCallback = (error) => {
    console.log(`There was an error connecting to the video stream: ${error.message}`);
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