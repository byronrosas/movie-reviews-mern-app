"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signToken = signToken;
exports.verifyToken = verifyToken;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function signToken(_x) {
  return _signToken.apply(this, arguments);
}

function _signToken() {
  _signToken = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userId) {
    var options, payload, token;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // token options   
            options = {
              expiresIn: "24h",
              issuer: process.env.DOMAIN,
              audience: userId
            };
            payload = {}; // sign token with payload and options

            _context.next = 4;
            return _jsonwebtoken["default"].sign(payload, process.env.SECRET_TOKEN, options);

          case 4:
            token = _context.sent;
            return _context.abrupt("return", token);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _signToken.apply(this, arguments);
}

function verifyToken(_x2) {
  return _verifyToken.apply(this, arguments);
}

function _verifyToken() {
  _verifyToken = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(token) {
    var decoded;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _jsonwebtoken["default"].verify(token, process.env.SECRET_TOKEN);

          case 2:
            decoded = _context2.sent;
            return _context2.abrupt("return", decoded);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _verifyToken.apply(this, arguments);
}