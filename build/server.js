"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _expressFileupload = _interopRequireDefault(require("express-fileupload"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _cors = _interopRequireDefault(require("cors"));

var _register = _interopRequireDefault(require("./routes/register.route"));

var _article = _interopRequireDefault(require("./routes/article.route"));

var _gif = _interopRequireDefault(require("./routes/gif.route"));

var _get = _interopRequireDefault(require("./routes/get.route"));

var _comment = _interopRequireDefault(require("./routes/comment.route"));

var _swagger = _interopRequireDefault(require("../swagger.json"));

// routers
// swagger documentation
_dotenv["default"].config(); // instantiate express


var app = (0, _express["default"])(); // configure cors

app.use((0, _cors["default"])());
var port = process.env.PORT || 3000; // configure bodyparser

app.use(_bodyParser["default"].json({
  extended: true
})); // configure file-upload

app.use((0, _expressFileupload["default"])({
  useTempFiles: true
}));
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Authorization');
  next();
}); // app router

app.use('/api/v1/', _register["default"]);
app.use('/api/v1/', _article["default"]);
app.use('/api/v1', _gif["default"]);
app.use('/api/v1', _get["default"]);
app.use('/api/v1/', _comment["default"]); // swagger route

app.use('/api/v1/docs', _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(_swagger["default"])); // welcome route

app.use('/', function (req, res) {
  res.status(200).json({
    status: 'success',
    message: 'welcome to the team work api'
  });
}); // wronge routes

app.use('*', function (req, res) {
  res.status(404).json({
    status: 'error',
    error: 'wrong route'
  });
});
app.listen(port, function () {
  console.log("app is running on ".concat(port));
}); // export app for test

var _default = app;
exports["default"] = _default;
//# sourceMappingURL=server.js.map