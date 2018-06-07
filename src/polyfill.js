require('es6-promise/auto');
require('es5-shim');

if (!Array.prototype.find) {
  Array.prototype.find = function(predicate) {
    if (this === null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return value;
      }
    }
    return undefined;
  };
}

if (!Array.prototype.includes) {
  Array.prototype.includes = function(str) {
    if (this === null) {
      throw new TypeError('Array.prototype.includes called on null or undefined');
    }
    if (!str) {
      throw new TypeError('str must be a string');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var value;
    for (var i = 0; i < length; i++) {
      value = list[i];
      if (value === str) {
        return true;
      }
    }
    return false;
  };
}
