const { execSync } = require("child_process");

module.exports = {
  go: {
    getVersion: "go version",
    getInstallInstructions(v) {
      if (hasGvm()) {
        return `To install go, run \`gvm install go${v}\``;
      }

      return `To install go, see https://golang.org/dl/`;
    }
  },
};

function hasGvm() {
  try {
   // check for existance of nvm
   execSync(
     'gvm',
     { stdio:[] } // don't care about output
   );
  } catch (e) {
   // no nvm,
   return false;
  }

  return true;
}
