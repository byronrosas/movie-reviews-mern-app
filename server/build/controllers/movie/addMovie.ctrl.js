"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = require("../../models");

var _movie = require("../../models/validation/movie.validation");

// Add movie controller
function AddMovieCtrl(moviePersistence, reviewPersistence) {
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
              return _movie.movieValidation.validateAsync(body);

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
      var session, userId, valuesResult, title, rating, review, addedMovie, addedReview;
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
              // user logged
              userId = req.userId; // validate

              _context.next = 8;
              return isValid(req.body);

            case 8:
              valuesResult = _context.sent;
              title = valuesResult.title, rating = valuesResult.rating, review = valuesResult.review; // save movie

              _context.next = 12;
              return moviePersistence.save({
                title: title,
                user: userId
              });

            case 12:
              addedMovie = _context.sent;
              _context.next = 15;
              return reviewPersistence.save({
                movie: addedMovie._id,
                rating: rating,
                review: review,
                user: userId
              });

            case 15:
              addedReview = _context.sent;
              _context.next = 18;
              return session.commitTransaction();

            case 18:
              session.endSession();
              res.json({
                movie: addedMovie,
                review: addedReview
              });
              _context.next = 30;
              break;

            case 22:
              _context.prev = 22;
              _context.t0 = _context["catch"](4);
              _context.next = 26;
              return session.abortTransaction();

            case 26:
              session.endSession();
              console.log(_context.t0.message);
              if (_context.t0.isJoi === true) _context.t0.status = 422;
              next(_context.t0);

            case 30:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[4, 22]]);
    }));

    return function (_x2, _x3, _x4) {
      return _ref.apply(this, arguments);
    };
  }();
}

var _default = AddMovieCtrl;
exports["default"] = _default;