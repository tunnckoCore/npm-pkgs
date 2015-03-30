/**
 * npm-pkgs <https://github.com/tunnckoCore/npm-pkgs>
 *
 * Copyright (c) 2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var is = require('assert-kindof');
var got = require('got');
var cheerio = require('cheerio');

var url = 'https://www.npmjs.com/~';
var selector = '.bullet-free';

/**
 * List packages of the given [npmjs.com](http://npm.im) user
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
  is.string(username);
  if (username.length === 0) {
    throw new Error('[npm-pkgs] expect `username` to be non empty string');
  }
  is.function(callback);

  var pkgs = [];

  got.get(url + username, function _cb(err, res) {
    if (!is.kindof.null(err)) {
      callback(err);
      return;
    }

    var $ = cheerio.load(res);

    $(selector).first().find('li a').each(function _defaultIterator() {
      pkgs.push($(this).attr('href').trim().split('/package/')[1]);
    });

    callback(null, pkgs);
  });
};
