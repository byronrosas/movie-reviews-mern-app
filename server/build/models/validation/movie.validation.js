"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.movieValidation = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var movieValidation = _joi["default"].object({
  user: _joi["default"].string().min(6).max(300).required(),
  title: _joi["default"].string().max(255).required()
});

exports.movieValidation = movieValidation;