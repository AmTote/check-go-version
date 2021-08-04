var semver = require('semver');

var current = process.version;
var supported = require('./package.json').engines.node;

if (!semver.satisfies(current, supported)) {
  console.error(
    '\n' +
    'You are using node version ' + semver.valid(current) + '.\n\n' +
    'check-go-version supports node verion ' + semver.valid(semver.minVersion(supported)) + ' and newer.\n\n' +
    'Please  update your version of node' +
    'We are sorry for the inconvenience.' +
    '\n'
  );

  process.exit(1);
}
