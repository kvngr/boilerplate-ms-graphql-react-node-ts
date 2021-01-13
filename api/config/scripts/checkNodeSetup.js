/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const path = require('path');
const exec = require('child_process').exec;
const chalk = require('chalk');

const ROOT_DIRECTORY = process.cwd();

const NODE_ENV = process.env.NODE_ENV;

require('dotenv').config({ path: path.resolve(ROOT_DIRECTORY, 'config', `.env.${NODE_ENV}`) });

const NODE_VERSION = process.env.NODE_VERSION;
const NPM_VERSION = process.env.NPM_VERSION;

function checkNodeVersion() {
    return new Promise((resolve) => {
        exec('node -v', (err, stdout) => {
            stdout = process.versions.node;
            if (err) throw err;
            if (parseFloat(stdout) < NODE_VERSION) {
                throw new Error(`[ERROR] You need node version @>=${NODE_VERSION}`).process.exit(1);
            }
            resolve(console.log(chalk.green('node version Ok ✔︎')));
        });
    });
}

function checkNpmVersion() {
    return new Promise((resolve) => {
        exec('npm -v', (err, stdout) => {
            if (err) throw err;
            if (parseFloat(stdout) < NPM_VERSION) {
                throw new Error(`[ERROR] You need npm version @>=${NPM_VERSION}`).process.exit(1);
            }
            resolve(console.log(chalk.green('npm version Ok ✔︎')));
        });
    });
}

function allChecked() {
    return Promise.all([checkNodeVersion(), checkNpmVersion()]);
}

async function waitChecking() {
    console.log(chalk.yellow('checking Node environment ...'));
    return await allChecked();
}

waitChecking();
