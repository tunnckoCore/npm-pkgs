/**
 * npm-pkgs <https://github.com/tunnckoCore/npm-pkgs>
 *
 * Copyright (c) 2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var assert = require('assert');
var npmPkgs = require('./index');

describe('npm-pkgs:', function() {
  it('should work properly when existing user given', function(done) {
    this.timeout(30000);
    npmPkgs('tunnckocore', function _cb(err, res) {
      assert.ifError(err);
      assert.strictEqual(res.length > 90, true);
      done();
    });
  });
  it('should error when non existing user given', function(done) {
    this.timeout(30000);
    npmPkgs('fjk43hkjhhhhhhhhhhhhhhhkjgg3k4g234', function _cb(err, res) {
      assert.strictEqual(err instanceof Error, true);
      assert.strictEqual(res, undefined);
      done();
    });
  });
});
