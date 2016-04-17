'use strict';

var lunr = require('lunr');
var index;

function resetIndex() {
  index = lunr(function () {
    this.field('file');
    this.field('type');
    this.ref('path');
  });
}

function addToIndex(file) {
  index.add(file);
}

function find(query, cb) {
  if (!index) { resetIndex(); }

  var results = index.search(query);
  cb(results);
}

module.exports = {
  addToIndex: addToIndex,
  find: find,
  resetIndex: resetIndex
};
