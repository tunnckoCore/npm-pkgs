/**
 * npm-pkgs <https://github.com/tunnckoCore/npm-pkgs>
 *
 * Copyright (c) 2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var got = require('got');
var cheerio = require('cheerio');

/**
 * List packages of the given user
 *
 * **Example**
 * ```js
 * var npmPkgs = require('npm-pkgs');
 *
 * npmPkgs('tunnckocore', function _cb(err, res) {
 *   if (err) {
 *     console.error(err);
 *     return;
 *   }
 *   console.log(res);
 *   //=> ['list', 'of', 'user', 'packages']
 * });
 * ```
 *
 * @name   npmPkgs
 * @param  {String}   `<username>` non emptry string, npm username
 * @param  {Function} `<callback>` node-style callback `(err, res)`
 * @api public
 */
module.exports = function npmPkgs(username, callback) {
  if (typeof username !== 'string') {
    throw new TypeError('[npm-pkgs] expect `username` to be string');
  }
  if (username.length === 0) {
    throw new Error('[npm-pkgs] expect `username` to be non empty string');
  }
  if (typeof callback !== 'function') {
    throw new TypeError('[npm-pkgs] expect `callback` to be function');
  }

  var pkgs = [];

  got.get('https://www.npmjs.com/~' + username, function _cb(err, res) {
    if (err) {
      callback(err);
      return;
    }

    var $ = cheerio.load(res);
    $('.bullet-free').first().find('li a')
    .each(function _defaultIterator() {
      pkgs.push($(this).attr('href').trim().split('/package/')[1]);
    });
    callback(null, pkgs);
  });
};