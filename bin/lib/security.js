const { exec } = require('child_process');
const emoji = require('node-emoji');

module.exports = () => new Promise((resolve, reject) => {
  console.log('\n');
  console.info(
    `${emoji.get('mag')}  ${'Checking for security risks...'.white}                   ${
      '(npm audit)'.grey
    }`
  );

  exec('npm audit', (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      reject();
    } else if (stderr) {
      console.log(stderr);
      reject();
    } else if (stdout) {
      if (stdout.indexOf('0 vulnerabilities') > 0) {
        console.log('\n');
        console.log(`${emoji.get('sparkles')} No known security vulnerabilities found!`.blue);
        resolve();
      }
    }
  });
});
