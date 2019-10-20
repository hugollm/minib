#!/usr/bin/env node
const exec = require('child_process').exec;

const pipeline = require('./pipeline');
const server = require('./server');


main();

function main() {
    let args = process.argv.slice(2);
    let mode = args[0];
    if (mode != 'dev' && mode != 'build')
        throw 'Invalid mode: ' + mode;
    if (mode == 'dev')
        startServer(args[1]);
    pipeline.run(mode);
}

function startServer(devDir) {
    if (!devDir)
        throw 'Dev directory is mandatory in this mode.';
    server.start(devDir);
}
