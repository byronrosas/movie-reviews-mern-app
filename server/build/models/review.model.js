"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var ReviewSchema = new _mongoose.Schema({
  movie: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true
  },
  user: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: true,
    "default": 1
  },
  review: {
    type: String,
    maxLength: 255,
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)('Review', ReviewSchema);

exports["default"] = _default;