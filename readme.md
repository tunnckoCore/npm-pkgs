## [![npm][npmjs-img]][npmjs-url] [![mit license][license-img]][license-url] [![build status][travis-img]][travis-url] [![coverage status][coveralls-img]][coveralls-url] [![deps status][daviddm-img]][daviddm-url]

> List user`s npm packages from the npmjs.com website profile. API and CLI.

## Install
```
npm i --save npm-pkgs
npm test
```


## API
> For more use-cases see the [tests](./test.js)

### [npmPkgs](./index.js#L35)
> List packages of the given user

- `<username>` **{String}**  non emptry string, npm username
- `<callback>` **{Function}** node-style callback `(err, res)`

**Example**
```js
var npmPkgs = require('npm-pkgs');

npmPkgs('tunnckocore', function _cb(err, res) {
  if (err) {
    console.error(err);
    return;
  }
  console.log(res);
  //=> ['list', 'of', 'user', 'packages']
});
```


## Author
**Charlike Mike Reagent**
+ [gratipay/tunnckoCore][author-gratipay]
+ [twitter/tunnckoCore][author-twitter]
+ [github/tunnckoCore][author-github]
+ [npmjs/tunnckoCore][author-npmjs]
+ [more ...][contrib-more]


## License [![MIT license][license-img]][license-url]
Copyright (c) 2015 [Charlike Mike Reagent][contrib-more], [contributors][contrib-graf].  
Released under the [`MIT`][license-url] license.


[npmjs-url]: http://npm.im/npm-pkgs
[npmjs-img]: https://img.shields.io/npm/v/npm-pkgs.svg?style=flat&label=npm-pkgs

[coveralls-url]: https://coveralls.io/r/tunnckoCore/npm-pkgs?branch=master
[coveralls-img]: https://img.shields.io/coveralls/tunnckoCore/npm-pkgs.svg?style=flat

[license-url]: https://github.com/tunnckoCore/npm-pkgs/blob/master/license.md
[license-img]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat

[travis-url]: https://travis-ci.org/tunnckoCore/npm-pkgs
[travis-img]: https://img.shields.io/travis/tunnckoCore/npm-pkgs.svg?style=flat

[daviddm-url]: https://david-dm.org/tunnckoCore/npm-pkgs
[daviddm-img]: https://img.shields.io/david/tunnckoCore/npm-pkgs.svg?style=flat

[author-gratipay]: https://gratipay.com/tunnckoCore
[author-twitter]: https://twitter.com/tunnckoCore
[author-github]: https://github.com/tunnckoCore
[author-npmjs]: https://npmjs.org/~tunnckocore

[contrib-more]: http://j.mp/1stW47C
[contrib-graf]: https://github.com/tunnckoCore/npm-pkgs/graphs/contributors

***

_Powered and automated by [kdf](https://github.com/tunnckoCore), March 26, 2015_