#!/usr/bin/env node
/**
 * npm-pkgs <https://github.com/tunnckoCore/npm-pkgs>
 *
 * Copyright (c) 2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var is = require('is-kindof');
var meow = require('meow');
var chalk = require('chalk');
var npmPkgs = require('./index');
var multiline = require('multiline');
var symbols = require('log-symbols');
var exit = process.exit;

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

if (is.array(cli.input) && !cli.input.length) {
  var msg = chalk.red('should provide username, try run');
  console.error('\n  %s %s', symbols.error, msg);
  console.error('  %s %s\n', symbols.error, chalk.gray('npm-pkgs --help'));
  exit(1);
}
console.log('  %s %s', symbols.info, chalk.gray('sending request'));
console.log('  %s %s', symbols.info, chalk.gray('please white, may take few seconds...'));

npmPkgs(String(cli.input[0]), function _cb(err, res) {
  if (!is.null(err)) {
    console.error('\n  %s %s\n', symbols.error, chalk.red(err.message));
    exit(1);
  }

  console.log(chalk.gray('  ========================================'));

  res.forEach(function _each(item) {
    console.log('  %s %s', symbols.success, chalk.gray(item));
  })

  exit(0);
});
