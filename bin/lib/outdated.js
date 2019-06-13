const { exec } = require('child_process');
const emoji = require('node-emoji');
const config = require('./_config');

module.exports = () => new Promise((resolve, reject) => {
  const { name } = config;

  console.log('\n');
  console.info(
    `${emoji.get('mag')}  ${'Checking for availbable updates...'.white}            ${
      '(npm outdated)'.grey
    }`
  );

  exec('npm outdated', (err, stdout, stderr) => {
    if (err && !stdout) {
      console.error(err);
      reject();
    } else if (stderr) {
      console.log(stderr);
      reject();
    } else if (stdout) {
      console.log('\n');
      console.log('----------------------------------------------------------------'.yellow);
      console.log(
        ` ${emoji.get('warning')}  ${`${
          name.bold
        } found out of date packages you may want to check ${emoji.get('warning')}`}`.yellow
      );
      console.log('----------------------------------------------------------------'.yellow);
      // const updates = stdout;
      stdout = stdout.split('Package').join('Package'.blue.bold);
      stdout = stdout.split('Current').join('Current'.blue.bold);
      stdout = stdout.split('Wanted').join('Wanted'.blue.bold);
      stdout = stdout.split('Latest').join('Latest'.blue.bold);
      stdout = stdout.split('Location').join('Location'.blue.bold);
      console.log(stdout);
      console.log('\n');
      console.log(`${emoji.get('thumbsup')} Everything else looks A-OK!`.white);
      console.log('\n');
      resolve('updates');
    } else {
      console.log('\n');
      console.log(`${emoji.get('sparkles')} All of your packages are up to date!`.blue);
      resolve();
    }
  });
});
