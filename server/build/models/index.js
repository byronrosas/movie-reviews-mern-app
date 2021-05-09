"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "movieModel", {
  enumerable: true,
  get: function get() {
    return _movie["default"];
  }
});
Object.defineProperty(exports, "reviewModel", {
  enumerable: true,
  get: function get() {
    return _review["default"];
  }
});
Object.defineProperty(exports, "userModel", {
  enumerable: true,
  get: function get() {
    return _user["default"];
  }
});

var _movie = _interopRequireDefault(require("./movie.model"));

var _review = _interopRequireDefault(require("./review.model"));

var _user = _interopRequireDefault(require("./user.model"));