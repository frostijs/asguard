const argv = require('minimist')(process.argv.slice(2));
const emoji = require('node-emoji');

let warnOnly = false;
let errorColor = 'red';
let errorEmoji = emoji.get('x');

if (argv.v || argv.V || argv.warn) warnOnly = true;

if (warnOnly) {
  errorColor = 'yellow';
  errorEmoji = emoji.get('warning');
}

module.exports = {
  warnOnly,
  errorColor,
  errorEmoji,
  name: 'Asguard',
  script: '@frosti/asguard'
};
