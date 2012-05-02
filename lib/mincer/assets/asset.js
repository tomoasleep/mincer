/** internal
 *  class Asset
 *
 *  The base class for [[BundledAsset]] and [[StaticAsset]].
 **/


'use strict';


// stdlib
var fs = require('fs');
var path = require('path');


// internal
var prop    = require('../common').prop;
var getter  = require('../common').getter;


var Asset = module.exports = function Asset(environment, logical_path, pathname) {
  prop(this, 'root',          environment.root);
  prop(this, 'environment',   environment);
  prop(this, 'logical_path',  logical_path);
  prop(this, 'pathname',      pathname);
  prop(this, 'content_type',  environment.contentTypeOf(pathname));
  prop(this, 'mtime',         environment.stat(pathname).mtime);
  prop(this, 'length',        environment.stat(pathname).size);
  prop(this, 'digest',        environment.getFileDigest(pathname));

  prop(this, 'dependencies',  []);
};


getter(Asset.prototype, 'digestPath', function () {
  var ext = path.extname(this.logical_path),
      base = path.basename(this.logical_path, ext);
  return base + '-' + this.digest + ext;
});


Asset.prototype.toArray = function () {
  return [this];
};


Asset.prototype.isFresh = function (env) {
  console.warn("isFresh is stubbed");
  return false;
};