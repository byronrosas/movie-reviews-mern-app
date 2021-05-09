"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authValidation = exports.userValidation = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var userValidation = _joi["default"].object({
  firstname: _joi["default"].string().min(1).max(150).required(),
  lastname: _joi["default"].string().min(1).max(150).required(),
  email: _joi["default"].string().email().lowercase().required(),
  password: _joi["default"].string().min(6).max(100).required()
});

exports.userValidation = userValidation;

var authValidation = _joi["default"].object({
  email: _joi["default"].string().email().lowercase().required(),
  password: _joi["default"].string().min(6).max(100).required()
});

exports.authValidation = authValidation;