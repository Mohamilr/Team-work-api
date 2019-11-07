"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _register = _interopRequireDefault(require("../controllers/register"));

var _get = _interopRequireDefault(require("../controllers/get"));

var getRouter = (0, _express.Router)();
getRouter.get('/feed', _register["default"].verifyToken, _get["default"].getAllArticlesGif);
getRouter.get('/articles/:id', _register["default"].verifyToken, _get["default"].getSingleArticle);
getRouter.get('/gifs/:id', _register["default"].verifyToken, _get["default"].getSingleGif);
var _default = getRouter;
exports["default"] = _default;
//# sourceMappingURL=get.route.js.map