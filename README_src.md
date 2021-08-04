# check-go-version
{"gitdown": "badge", "name": "npm-version"}
{"gitdown": "badge", "name": "appveyor"}
{"gitdown": "badge", "name": "travis"}

Check installed versions of `go`.

{"gitdown": "contents"}

## Install

[npm: *check-go-version*](https://www.npmjs.com/package/check-go-version)

```bash
npm install check-go-version
```

## Command Line Usage

```
{"gitdown": "include", "file": "./usage.txt"}
```

### Examples

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

#### Check for go 1.16, passing

If all versions match, there is no output:

```bash
$ check-go-version --go 1.16
$ echo $?
0
```
#### Use with `npm test`

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
