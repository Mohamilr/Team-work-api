"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _register = _interopRequireDefault(require("../controllers/register"));

var _comments = _interopRequireDefault(require("../controllers/comments"));

var commentRouter = (0, _express.Router)();
commentRouter.post('/articles/:id/comment', _register["default"].verifyToken, _comments["default"].articleComment);
commentRouter.post('/gifs/:id/comment', _register["default"].verifyToken, _comments["default"].gifComment);
var _default = commentRouter;
exports["default"] = _default;
//# sourceMappingURL=comment.route.js.map