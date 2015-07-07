/**
 * npm-pkgs <https://github.com/tunnckoCore/npm-pkgs>
 *
 * Copyright (c) 2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var JsonReq = require("jsonrequest");
var SameTime = require("same-time");

var url = 'https://www.npmjs.com/profile/__USER__/packages?offset=__OFFSET__';

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
  function doReq(offset, cb) {
    var reqUrl = url.replace("__USER__", username).replace("__OFFSET__", offset);
    JsonReq(reqUrl, function (err, res) {
      if (err) { return cb(err); }
      if (!res.items) {
        return cb(null, []);
      }
      cb(null, res);
    });
  }
  var pkgs = [];
  doReq(0, function (err, res) {
    if (err) { return callback(err); }
    if (res.items.length < res.count) {
        pkgs = res.items;
        return SameTime(new Array(Math.ceil(res.count / res.items.length) - 1).join(".").split("").map(function (c, i) {
            return function (cb) {
                doReq((i + 1) * 100, function (err, res) {
                    if (err) { return cb(err); }
                    pkgs = pkgs.concat(res.items);
                    cb();
                });
            }
        }), function (err) {
            if (err) { return callback(err); }
            callback(null, pkgs);
        });
    }

    callback(null, res.items);
  });
};
