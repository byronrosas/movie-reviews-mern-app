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

var _movie = require("../../models/validation/movie.validation");

//remove controller
function RemoveMovieCtrl(moviePersistence, reviewPersistence) {
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
              return _movie.id.validateAsync(body);

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
      var session, valuesResult, _id, movieFound, result, resultReview;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _models.movieModel.startSession();

            case 2:
              session = _context.sent;
              session.startTransaction();
              _context.prev = 4;
              _context.next = 7;
              return isValid(req.params);

            case 7:
              valuesResult = _context.sent;
              _id = valuesResult.id; // verify review exists            

              _context.next = 11;
              return moviePersistence.getById(_id);

            case 11:
              movieFound = _context.sent;

              if (movieFound) {
                _context.next = 14;
                break;
              }

              throw _httpErrors["default"].NotFound("Review not found");

            case 14:
              _context.next = 16;
              return moviePersistence.remove(_id);

            case 16:
              result = _context.sent;
              _context.next = 19;
              return reviewPersistence.removeByMovie(movieFound._id);

            case 19:
              resultReview = _context.sent;
              console.log(result); // commit

              _context.next = 23;
              return session.commitTransaction();

            case 23:
              session.endSession();
              res.json({
                message: 'removed'
              });
              _context.next = 35;
              break;

            case 27:
              _context.prev = 27;
              _context.t0 = _context["catch"](4);
              _context.next = 31;
              return session.abortTransaction();

            case 31:
              session.endSession();
              console.log(_context.t0.message);
              if (_context.t0.isJoi === true) _context.t0.status = 422;
              next(_context.t0);

            case 35:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[4, 27]]);
    }));

    return function (_x2, _x3, _x4) {
      return _ref.apply(this, arguments);
    };
  }();
}

var _default = RemoveMovieCtrl;
exports["default"] = _default;