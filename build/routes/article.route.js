"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _articles = _interopRequireDefault(require("../controllers/articles"));

var _register = _interopRequireDefault(require("../controllers/register"));

var _article = _interopRequireDefault(require("../middleware/article.middleware"));

// middleware
var articleRouter = (0, _express.Router)();
articleRouter.post('/articles', _register["default"].verifyToken, _article["default"].checkPost_ModifyArticle, _articles["default"].createArticle);
articleRouter.patch('/articles/:id', _register["default"].verifyToken, _article["default"].checkPost_ModifyArticle, _articles["default"].modifyArticle);
articleRouter["delete"]('/articles/:id', _register["default"].verifyToken, _articles["default"].deleteArticle);
var _default = articleRouter;
exports["default"] = _default;
//# sourceMappingURL=article.route.js.map