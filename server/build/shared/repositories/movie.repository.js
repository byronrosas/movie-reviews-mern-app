"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _models = require("../../models");

var MovieRepository = /*#__PURE__*/function () {
  function MovieRepository() {
    (0, _classCallCheck2["default"])(this, MovieRepository);
  }

  (0, _createClass2["default"])(MovieRepository, [{
    key: "save",
    value: function () {
      var _save = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(movie) {
        var newMovie, result;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // create new model
                newMovie = new _models.movieModel(movie); // save

                _context.next = 3;
                return newMovie.save();

              case 3:
                result = _context.sent;
                return _context.abrupt("return", result);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function save(_x) {
        return _save.apply(this, arguments);
      }

      return save;
    }()
  }, {
    key: "listWithRating",
    value: function () {
      var _listWithRating = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(page, limit) {
        var skip, result;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                skip = page * limit; // search by email                 

                _context2.next = 3;
                return _models.movieModel.aggregate([[{
                  $lookup: {
                    from: 'reviews',
                    localField: '_id',
                    foreignField: 'movie',
                    as: 'reviews'
                  }
                }, {
                  $project: {
                    title: 1,
                    createdAt: 1,
                    ratingAvg: {
                      $avg: "$reviews.rating"
                    }
                  }
                }, {
                  $sort: {
                    createdAt: -1
                  }
                }, {
                  $skip: skip
                }, {
                  $limit: limit
                }]]);

              case 3:
                result = _context2.sent;
                return _context2.abrupt("return", result);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function listWithRating(_x2, _x3) {
        return _listWithRating.apply(this, arguments);
      }

      return listWithRating;
    }()
  }, {
    key: "getById",
    value: function () {
      var _getById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(id) {
        var result;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _models.movieModel.findOne({
                  _id: id
                });

              case 2:
                result = _context3.sent;
                return _context3.abrupt("return", result);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function getById(_x4) {
        return _getById.apply(this, arguments);
      }

      return getById;
    }()
  }, {
    key: "remove",
    value: function () {
      var _remove = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(id) {
        var result;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _models.movieModel.deleteOne({
                  _id: id
                });

              case 2:
                result = _context4.sent;
                return _context4.abrupt("return", result);

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function remove(_x5) {
        return _remove.apply(this, arguments);
      }

      return remove;
    }()
  }]);
  return MovieRepository;
}();

exports["default"] = MovieRepository;