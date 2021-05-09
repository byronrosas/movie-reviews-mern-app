"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.id = exports.reviewListParamsValidation = exports.reviewValidation = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var reviewValidation = _joi["default"].object({
  movie: _joi["default"].string().min(6).max(300).required(),
  rating: _joi["default"].number().min(1).max(10).required(),
  review: _joi["default"].string().max(255).required()
});

exports.reviewValidation = reviewValidation;

var reviewListParamsValidation = _joi["default"].object({
  page: _joi["default"].number().min(0).max(200).required(),
  movie: _joi["default"].string().min(6).max(300).required()
});

exports.reviewListParamsValidation = reviewListParamsValidation;

var id = _joi["default"].object({
  id: _joi["default"].string().min(6).max(300).required()
});

exports.id = id;