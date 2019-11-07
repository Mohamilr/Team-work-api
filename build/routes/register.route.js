"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _register = _interopRequireDefault(require("../controllers/register"));

var _register2 = _interopRequireDefault(require("../middleware/register.middleware"));

// middleware
var userRouter = (0, _express.Router)();
userRouter.post('/auth/create-user', _register2["default"].checkSignUp, _register["default"].signUP);
userRouter.post('/auth/signin', _register["default"].logIn);
var _default = userRouter;
exports["default"] = _default;
//# sourceMappingURL=register.route.js.map