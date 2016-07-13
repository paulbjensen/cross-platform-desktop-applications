'use strict';

// Dependencies
let exec = require('child_process').exec;
let path = require('path');

let command = 'node_modules/.bin/cucumber-js';
if (process.platform === 'win32') command += '.cmd';

exec(path.join(process.cwd(), command), (err, stdout, stderr) => {
  console.log(stdout);
  console.log(stderr);
});