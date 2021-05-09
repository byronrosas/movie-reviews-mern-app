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

var _review = require("../../models/validation/review.validation");

//list controller
function ListReviewsCtrl(reviewPersistence, moviePersistence) {
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
              return _review.reviewListParamsValidation.validateAsync(body);

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
      var limit, valuesResult, page, movie, movieFound, reviews;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              limit = 10; // validate

              _context.next = 4;
              return isValid(req.params);

            case 4:
              valuesResult = _context.sent;
              page = valuesResult.page, movie = valuesResult.movie; // verify movie exists            

              _context.next = 8;
              return moviePersistence.getById(movie);

            case 8:
              movieFound = _context.sent;

              if (movieFound) {
                _context.next = 11;
                break;
              }

              throw _httpErrors["default"].NotFound("Movie not found");

            case 11:
              _context.next = 13;
              return reviewPersistence.listByMovie(movie, page, limit);

            case 13:
              reviews = _context.sent;
              res.json({
                page: page,
                limit: limit,
                reviews: reviews
              });
              _context.next = 22;
              break;

            case 17:
              _context.prev = 17;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0.message);
              if (_context.t0.isJoi === true) _context.t0.status = 422;
              next(_context.t0);

            case 22:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 17]]);
    }));

    return function (_x2, _x3, _x4) {
      return _ref.apply(this, arguments);
    };
  }();
}

var _default = ListReviewsCtrl;
exports["default"] = _default;