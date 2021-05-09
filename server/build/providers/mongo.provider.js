"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireDefault(require("mongoose"));

_mongoose["default"].connect("mongodb://localhost:27017/movierev", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(function (db) {
  console.log("DB is connected");
})["catch"](function (error) {
  console.log(error);
});

_mongoose["default"].connection.on('connected', function () {
  console.log('Mongoose connected to db');
});

_mongoose["default"].connection.on('error', function (err) {
  console.log(err.message);
});

_mongoose["default"].connection.on('disconnected', function () {
  console.log('Mongoose connection is disconnected.');
});

process.on('SIGINT', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _mongoose["default"].connection.close();

        case 2:
          process.exit(0);

        case 3:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));