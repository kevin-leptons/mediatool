#!/usr/bin/env node

const os = require('os');

const yargs = require('yargs');

yargs.
usage('$0 <cmd> [args]').
strict().
demandCommand().

command('mp3 <src> <dest>', 'Convert media files to mp3', (yargs) => {
    yargs.
    positional('src', {
        describe: 'List of source directories',
        type: 'string'
    }).
    positional('dest', {
        describe: 'Destination directory',
        type: 'string'
    }).
    option('override', {
        describe: 'Override destination file',
        type: 'boolean',
        default: false
    });
}, (arg) => {
    cli_to_mp3(arg);
}).

help().
argv;

function cli_to_mp3(conf) {
    const {convert_to_mp3} = require('../lib');

    convert_to_mp3(conf);
}
