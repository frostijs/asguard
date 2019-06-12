const emoji = require('node-emoji');
const figlet = require('figlet');
const config = require('./_config');

const { name, warnOnly } = config;

const biglog = (msg, color) => {
  console.log('\n');
  console.log('----------------------------------------------------------------'[color]);
  console.log(`${msg}`[color]);
  console.log('----------------------------------------------------------------'[color]);
  console.log('\n');
};

const start = () => {
  console.log('\n');
  console.log('----------------------------------------------------------------');
  console.log('\n');
  console.log(
    figlet.textSync(` ${name}`, {
      horizontalLayout: 'full',
      font: 'ANSI Shadow'
    }).white
  );
  console.log(
    `    ${emoji.get('shield')}  Guard against security risks and unused dependencies ${emoji.get(
      'shield'
    )}`
  );
  console.log('\n');
  console.log('----------------------------------------------------------------');
  console.log('\n');
};

const quit = (code) => {
  if (code === 0) {
    biglog(
      `         ${emoji.get('tada')} You're all good! ${name.bold} found no issues! ${emoji.get(
        'tada'
      )}`,
      'green'
    );
  } else if (warnOnly) {
    code = 0;
    biglog(
      `${emoji.get('cry')}  ${name.bold} found some problems, check logs above for more info.`,
      'yellow'
    );
  } else {
    code = 0;
    console.log('\n');
    console.log(
      `${emoji.get('broken_heart')}  ${
        name.bold
      } found some problems, check logs above for more info.!`.red
    );
    console.log('\n');
  }
  process.exit(code);
};

module.exports.biglog = biglog;
module.exports.quit = quit;
module.exports.start = start;
