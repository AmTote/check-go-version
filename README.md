<a name="check-go-version"></a>
# check-go-version
[![NPM version](http://img.shields.io/npm/v/check-go-version.svg?style=flat-square)](https://www.npmjs.org/package/check-go-version)
[![AppVeyor build status](https://img.shields.io/appveyor/ci/AmTote/check-go-version/master.svg?style=flat-square)](https://ci.appveyor.com/project/AmTote/check-go-version/branch/master)
[![Travis build status](http://img.shields.io/travis/AmTote/check-go-version/master.svg?style=flat-square)](https://travis-ci.org/AmTote/check-go-version)

Check installed versions of `go`.

* [check-go-version](#check-go-version)
    * [Install](#check-go-version-install)
    * [Command Line Usage](#check-go-version-command-line-usage)
        * [Examples](#check-go-version-command-line-usage-examples)
    * [API Usage](#check-go-version-api-usage)


<a name="check-go-version-install"></a>
## Install

[npm: *check-go-version*](https://www.npmjs.com/package/check-go-version)

```bash
npm install check-go-version
```

<a name="check-go-version-command-line-usage"></a>
## Command Line Usage

```
SYNOPSIS
      check-go-version [OPTIONS]

DESCRIPTION
      check-go-version will check if the current go
      versions match the given semver version ranges.

      If the given version is not satisfied, information about
      installing the needed version is printed and the program exits
      with an error code.

OPTIONS

      --go VERSION
            Check that the current node version matches the given semver
            version range.

      -p, --print
            Print installed versions.

      -h, --help
            Print this message.

```

<a name="check-go-version-command-line-usage-examples"></a>
### Examples

<a name="check-go-version-command-line-usage-examples-check-for-go-1-16-failing"></a>
#### Check for go 1.16, failing

Check for go 1.16, but have 1.15 installed.

```bash
$ check-go-version --go 1.16
go: 1.15
Error: Wanted go version 1.16 (>=1.16.0 <1.17.0)
To install go, run `gvm install go1.16.0` 
$ echo $?
1
```

<a name="check-go-version-command-line-usage-examples-check-for-go-1-16-passing"></a>
#### Check for go 1.16, passing

If all versions match, there is no output:

```bash
$ check-go-version --go 1.16
$ echo $?
0
```
<a name="check-go-version-command-line-usage-examples-use-with-npm-test"></a>
#### Use with <code>npm test</code>

```json
{
  "name": "my-package",
  "devDependencies": {
    "check-go-version": "^1.0.0"
  },
  "scripts": {
    "test": "check-go-version --go '>= 1.16' && node my-tests.js"
  }
}
```

<a name="check-go-version-api-usage"></a>
## API Usage

This module can also be used programmatically.
Pass it an object with the required versions of `go` followed by a results handler.

```javascript
const check = require("check-go-version");

check(
    { node: ">= 18.3", },
    (error, result) => {
        if (error) {
            console.error(error);
            return;
        }

        if (result.isSatisfied) {
            console.log("All is well.");
            return;
        }

        console.error("Some package version(s) failed!");

        for (const packageName of Object.keys(result.versions)) {
            if (!result.versions[packageName].isSatisfied) {
                console.error(`Missing ${packageName}.`);
            }
        }
    }
);
```

See `index.d.ts` for the full input and output type definitions.
