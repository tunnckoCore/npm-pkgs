#!/usr/bin/env node
/**
 * npm-pkgs <https://github.com/tunnckoCore/npm-pkgs>
 *
 * Copyright (c) 2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var is = require('assert-kindof');
var meow = require('meow');
var chalk = require('chalk');
var npmPkgs = require('./index');
var multiline = require('multiline');
var log = require('log-symbols');
var exit = process.exit;

var url = 'https://www.npmjs.com';

var cli = meow({
  help: chalk.gray(multiline.stripIndent(function() {/*
    Options
      --help        show this help
      --version     current version

    Usage
      npm-pkgs [username]

    Example
      npm-pkgs tunnckocore

  */}))
});

if (is.kindof.array(cli.input) && !cli.input.length) {
  console.error();
  console.error(chalk.red('  Whoaaa!'));
  console.error();
  console.error('  %s %s', log.error, chalk.red('You should give a npm username.'));
  console.error('  %s %s', log.info, chalk.blue('Try to run:'), chalk.gray('npm-pkgs tunnckocore'));
  console.error();
  exit(1);
}

console.log();
console.log(chalk.green('  Aloha, master!'));
console.log();
console.log('  %s %s', log.info, chalk.gray('Please wait a moment...'));
console.log('  %s %s', log.info, chalk.gray('We fetching data from'), chalk.blue(url));
console.log();

var username = String(cli.input[0]);

npmPkgs(username, function _cb(err, res) {
  if (!is.kindof.null(err)) {
    console.error('  %s %s', log.error, chalk.red(err.message));
    console.error();
    exit(1);
  }

  res.forEach(function _each(item) {
    console.log('  %s %s', log.success, chalk.gray(item));
  });

  console.log();
  console.log('  %s %s', log.success, chalk.gray(res.length + ' packages by'), chalk.bold(username));
  console.log();
  exit(0);
});
