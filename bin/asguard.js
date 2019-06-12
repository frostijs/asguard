#! /usr/bin/env node

// CHECKS
const depcheck = require('./depcheck');
const npm = require('./npm');
const { quit, start } = require('./_logger');

const asguard = () => {
  start();

  // Check for unused depewndencies
  depcheck()
    // Check for security risks
    .then(npm)
    .then(() => {
      quit(0);
    })
    .catch(() => {
      quit(1);
    });
};

asguard();
