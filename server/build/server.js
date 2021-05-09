"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _cors = _interopRequireDefault(require("cors"));

var _helmet = _interopRequireDefault(require("helmet"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _auth = _interopRequireDefault(require("./routes/auth.route"));

var _movie = _interopRequireDefault(require("./routes/movie.route"));

var _review = _interopRequireDefault(require("./routes/review.route"));

// Byron Rosas => Server
_dotenv["default"].config(); // express app


var app = (0, _express["default"])(); // white origin list

var whiteList = [process.env.CLIENT_URL, 'http://127.0.0.1:3000', 'http://127.0.0.1:3001', 'http://localhost:3000'];

var corsOptionsFunction = function corsOptionsFunction(req, callback) {
  var opt;

  if (whiteList.indexOf(req.header('Origin')) !== -1) {
    // opt with origin true => enable CORS for this request
    opt = {
      origin: true
    };
  } else {
    // opt with origin false => disable CORS for this request
    opt = {
      origin: false
    };
  } // callback params (error, opt)


  callback(null, opt);
}; // use cors with opt function


app.use((0, _cors["default"])(corsOptionsFunction)); // app.use(helmet());

app.use(function (req, res, next) {
  res.setHeader('Content-Security-Policy-Report-Only', "default-src 'self'; font-src 'self'; img-src 'self' https://images.unsplash.com; script-src 'self'; style-src 'self' https://fonts.googleapis.com https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css; frame-src 'self'");
  next();
});
app.use(_express["default"].json({
  limit: "1MB"
}));
app.use(_express["default"].urlencoded({
  limit: "1MB",
  extended: false
}));
app.use((0, _cookieParser["default"])());

if (process.env.ENV === 'production') {
  // Serve any static files
  app.use(_express["default"]["static"](_path["default"].join(__dirname, '../../client/build'))); // Handle React routing, return all requests to React app

  app.get('*', function (req, res) {
    console.log("running production");
    res.sendFile(_path["default"].join(__dirname, '../../client/build', 'index.html'));
  });
} // routes


app.use('/API/auth', _auth["default"]);
app.use('/API/movie', _movie["default"]);
app.use('/API/review', _review["default"]); //  handle error

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = process.env.ENV === 'development' ? err : {};
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  });
});
var _default = app;
exports["default"] = _default;