#! /usr/bin/env node

// CHECKS
const depcheck = require('./lib/depcheck');
const security = require('./lib/security');
const outdated = require('./lib/outdated');
const { quit, start } = require('./lib/_logger');

const asguard = () => {
  start();

  // Check for unused depewndencies
  depcheck()
    // Check for security risks
    .then(security)
    .then(outdated)
    .then((result) => {
      if (result === 'updates') {
        process.exit(0);
      } else {
        quit(0);
      }
    })
    .catch(() => {
      quit(1);
    });
};

asguard();
