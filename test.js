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
  it('should throw TypeError when `username` is not a string', function(done) {
    assert.throws(function fixture() {
      npmPkgs({one: 'two'});
    }, /expect `username` to be string/);

    assert.throws(function fixture() {
      npmPkgs({one: 'two'});
    }, TypeError);
    done();
  });


  it('should throw Error when `username` is an empty string or array', function(done) {
    assert.throws(function fixture() {
      npmPkgs('');
    }, /expect `username` to be non empty string/);

    assert.throws(function fixture() {
      npmPkgs('');
    }, Error);

    done();
  });

  it('should throw TypeError when `callback` is not a function', function(done) {
    assert.throws(function fixture() {
      npmPkgs('tunnckocore', [1, 2, 3]);
    }, /expect `callback` to be/);

    assert.throws(function fixture() {
      npmPkgs('tunnckocore', [1, 2, 3]);
    }, TypeError);
    done();
  });

  it('should work properly when existing user given and callback', function(done) {
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
      assert.strictEqual(err.code, 404);
      assert.strictEqual(res, undefined);
      done();
    });
  });
});
