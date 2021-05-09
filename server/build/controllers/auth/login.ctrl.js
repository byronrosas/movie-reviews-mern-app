"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _models = require("../../models");

var _user = require("../../models/validation/user.validation");

var _token = require("../../shared/utils/token.utils");

// login controller
function LoginCtrl(userPersistence) {
  // validate fields
  function isValid(_x) {
    return _isValid.apply(this, arguments);
  }

  function _isValid() {
    _isValid = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(body) {
      var result;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _user.authValidation.validateAsync(body);

            case 2:
              result = _context2.sent;
              return _context2.abrupt("return", result);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return _isValid.apply(this, arguments);
  }

  return /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
      var valuesResult, email, password, user, matchPass, token;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return isValid(req.body);

            case 3:
              valuesResult = _context.sent;
              email = valuesResult.email, password = valuesResult.password; // query user by email

              _context.next = 7;
              return userPersistence.getByEmail(email);

            case 7:
              user = _context.sent;

              if (user) {
                _context.next = 10;
                break;
              }

              throw _httpErrors["default"].NotFound("User by email not found");

            case 10:
              _context.next = 12;
              return _models.userModel.compareData(password, user.password);

            case 12:
              matchPass = _context.sent;

              if (matchPass) {
                _context.next = 15;
                break;
              }

              throw _httpErrors["default"].NotFound("Password and email do not correct");

            case 15:
              _context.next = 17;
              return (0, _token.signToken)(user._id);

            case 17:
              token = _context.sent;
              res.json({
                token: token,
                fistname: user.firstname,
                lastname: user.lastname
              });
              _context.next = 26;
              break;

            case 21:
              _context.prev = 21;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0.message);
              if (_context.t0.isJoi === true) _context.t0.status = 422;
              next(_context.t0);

            case 26:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 21]]);
    }));

    return function (_x2, _x3, _x4) {
      return _ref.apply(this, arguments);
    };
  }();
}

var _default = LoginCtrl;
exports["default"] = _default;