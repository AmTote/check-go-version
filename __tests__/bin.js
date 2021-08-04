const { exec } = require("child_process");
const { unlink } = require("fs");

const test = require("ava").cb;

const goVersion = `go: 1.16.5`;

test("run with node", t => {
  exec("node ./bin.js --print", (error, stdout) => {
    t.falsy(error);
    t.truthy(stdout);
    t.true(stdout.includes(goVersion));

    t.end();
  });
});

test("run with npx", t => {
  exec("npx ./bin.js --print", (error, stdout) => {
    t.falsy(error);
    t.truthy(stdout);
    t.true(stdout.includes(goVersion));

    t.end();
  });
});

test("run npm package", t => {
  exec("npm pack", (error, stdout) => {
    t.falsy(error);
    const packageFile = stdout.trim();

    exec(`npx ./${packageFile} --print`, (error, stdout) => {
      unlink(packageFile, ()=>{});

      t.falsy(error);
      t.truthy(stdout);
      t.true(stdout.includes(goVersion));

      t.end();
    });
  });
});
