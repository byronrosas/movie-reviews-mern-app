"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.id = exports.movieListParamsValidation = exports.movieValidation = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var movieValidation = _joi["default"].object({
  title: _joi["default"].string().max(255).required(),
  rating: _joi["default"].number().min(1).max(10).required(),
  review: _joi["default"].string().max(255).required()
});

exports.movieValidation = movieValidation;

var movieListParamsValidation = _joi["default"].object({
  page: _joi["default"].number().min(0).max(200).required()
});

exports.movieListParamsValidation = movieListParamsValidation;

var id = _joi["default"].object({
  id: _joi["default"].string().min(6).max(300).required()
});

exports.id = id;