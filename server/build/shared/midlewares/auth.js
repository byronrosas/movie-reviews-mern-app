"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAuth = isAuth;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _user = _interopRequireDefault(require("../repositories/user.repository"));

var _token = require("../utils/token.utils");

var userRepository = new _user["default"](); // verify if user is logged in

function isAuth(_x, _x2, _x3) {
  return _isAuth.apply(this, arguments);
}

function _isAuth() {
  _isAuth = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var authHeader, bearerToken, token, tokenDecoded, idUser, user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (req.headers['authorization']) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", next(_httpErrors["default"].Unauthorized()));

          case 2:
            // get all header authorization string
            authHeader = req.headers["authorization"]; // divide string [bearer,token]

            bearerToken = authHeader.split(" "); // get only token

            token = bearerToken[1]; // verify if token exists

            if (token) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", next(_httpErrors["default"].Unauthorized("No token provided")));

          case 7:
            _context.prev = 7;
            _context.next = 10;
            return (0, _token.verifyToken)(token);

          case 10:
            tokenDecoded = _context.sent;
            idUser = tokenDecoded.aud; // verify user exists

            _context.next = 14;
            return userRepository.getById(idUser);

          case 14:
            user = _context.sent;

            if (user) {
              _context.next = 17;
              break;
            }

            throw _httpErrors["default"].NotFound('User not found');

          case 17:
            console.log("user auth=>", user);
            req.userId = idUser;
            next();
            _context.next = 29;
            break;

          case 22:
            _context.prev = 22;
            _context.t0 = _context["catch"](7);

            if (!(_context.t0.name === 'JsonWebTokenError')) {
              _context.next = 28;
              break;
            }

            return _context.abrupt("return", next(_httpErrors["default"].Unauthorized()));

          case 28:
            return _context.abrupt("return", next(_httpErrors["default"].Unauthorized(_context.t0.message)));

          case 29:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[7, 22]]);
  }));
  return _isAuth.apply(this, arguments);
}