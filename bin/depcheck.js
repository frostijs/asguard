#! /usr/bin/env node
require('colors');
const depcheck = require('depcheck');
const emoji = require('node-emoji');
const path = require('path');
const config = require('./_config');

module.exports = () => new Promise((resolve, reject) => {
  const ROOT_DIR = path.resolve(process.cwd());

  const { errorColor, errorEmoji } = config;

  const ignoreMatches = [
    // Used by Asguard
    '@frosti/asguard',
    'figlet',
    'minimist',
    'node-emoji',

    // Custom Alias' for @frosti boilerplated
    '@config/*',
    '@containers/*',
    '@components/*',
    '@css/*',
    '@dist/*',
    '@lib/*',
    '@public/*',
    '@render/*',
    '@src/*',
    '@styles/*',
    '@test/*',

    // Used by @frosti/config build scripts
    '@babel/*',
    '@csstools/*',
    'babel-*',
    'eslint-*',
    'favicons',
    'fs-extra',
    'postcss-*',
    'rollup-*',
    'postcss',
    'stylus',

    // Used by @frosti/server
    'chokidar',
    'colors',
    'compression',
    'cors',
    'express',
    'redirect-https',
    'spdy',

    // Used by npm scripts
    '@ind.ie/nodecert',
    'husky',
    'identity-obj-proxy',
    'jest',
    'npm-run-all',
    'prettier',
    'pretty-quick'
  ];

  const ignoreDirs = ['.dist', 'dist', 'functions'];

  const options = {
    ignoreBinPackage: false,
    skipMissing: false,
    ignoreDirs,
    ignoreMatches,
    specials: [
      // the target special parsers
      depcheck.special.babel,
      depcheck.special.eslint
    ]
  };

  depcheck(ROOT_DIR, options, (dependencies) => {
    let missing = false;
    let unused = false;
    let errorType = null;
    let count = 0;

    console.info(
      `${emoji.get('mag')}  ${'Checking for unused dependencies...'.white}               ${
        '(depcheck)'.grey
      }`
    );

    if (dependencies.missing.length > 0) {
      count += dependencies.missing.length;
      missing = true;
      errorType = 'missing';
    }
    if (dependencies.dependencies.length > 0) {
      count += dependencies.dependencies.length;
      unused = true;
      errorType = 'unused';
    }
    if (dependencies.devDependencies.length > 0) {
      count += dependencies.devDependencies.length;
      unused = true;
      errorType = 'unused';
    }

    if (unused && missing) errorType = 'unused & missng';
    else if (missing) errorType = 'missing';
    else if (unused) errorType = 'unused';

    if (missing || unused) {
      console.log('\n');
      console.warn(
        `${errorEmoji}  ${config.name.bold} found ${count} ${errorType} dependencies:`.white
      );
    } else {
      console.log('\n');
      console.log(`${emoji.get('star')} No missing or unused dependencies!`.blue);
    }

    if (dependencies.missing.length > 0) {
      console.log('\n');
      console.log('   Missing Dependencies'.red);
      console.log('   --------------------'.red);
      dependencies.missing.map((dependency) => {
        console.log(`   ${dependency}`.red);
      });
    }

    if (dependencies.dependencies.length > 0) {
      console.log('\n');
      console.log('   Unused Dependencies'[errorColor]);
      console.log('   -------------------'[errorColor]);
      dependencies.dependencies.map((dependency) => {
        console.log(`   ${dependency}`[errorColor]);
      });
    }

    if (dependencies.devDependencies.length > 0) {
      console.log('\n');
      console.log('   Unused Dev Dependencies'[errorColor]);
      console.log('   -----------------------'[errorColor]);
      dependencies.devDependencies.map((dependency) => {
        console.log(`   ${dependency}`[errorColor]);
      });
    }

    if (missing || unused) reject();
    else resolve();
  });
});
