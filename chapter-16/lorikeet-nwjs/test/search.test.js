'use strict';

const assert = require('assert');
const lunr = require('lunr');
global.window = {};
global.window.lunr = lunr;
const search = require('../search');

describe('search', () => {
  describe('#find', () => {
		it('should return results when a file matches a term', (done) => {

			const seedFileReferences = [
	      {
	        file: 'john.png',
	        type: 'image/png',
	        path: '/Users/pauljensen/Pictures/john.png'
	      },
	      {
	        file: 'bob.png',
	        type: 'image/png',
	        path: '/Users/pauljensen/Pictures/bob.png'
	      },
	      {
	        file: 'frank.png',
	        type: 'image/png',
	        path: '/Users/pauljensen/Pictures/frank.png'
	      }
    	];

    	search.resetIndex();
    	seedFileReferences.forEach(search.addToIndex);

    	search.find('frank', (results) => {
	   	assert(results.length === 1);
	   	assert.equal(seedFileReferences[2].path, results[0].ref);
	      done();
	    });
		});
  });
});
