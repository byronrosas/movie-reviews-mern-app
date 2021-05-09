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
    key: "listPagination",
    value: function () {
      var _listPagination = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(skip, limit) {
        var result;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _models.movieModel.aggregate([{
                  $lookup: {
                    from: "reviews",
                    localField: "_id",
                    foreignField: "movie",
                    as: "reviews"
                  }
                }, {
                  $group: {
                    _id: "$reviews._id",
                    totalAmount: {
                      $sum: {
                        $multiply: ["$price", "$quantity"]
                      }
                    },
                    count: {
                      $sum: 1
                    }
                  }
                }]);

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

      function listPagination(_x2, _x3) {
        return _listPagination.apply(this, arguments);
      }

      return listPagination;
    }()
  }]);
  return MovieRepository;
}();

exports["default"] = MovieRepository;