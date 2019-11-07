"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _gifs = _interopRequireDefault(require("../controllers/gifs"));

var _register = _interopRequireDefault(require("../controllers/register"));

var _gif = _interopRequireDefault(require("../middleware/gif.middleware"));

// middleware 
var gifRouter = (0, _express.Router)();
gifRouter.post('/gifs', _register["default"].verifyToken, _gif["default"].checkPostGif, _gifs["default"].postGif);
gifRouter["delete"]('/gifs/:id', _register["default"].verifyToken, _gifs["default"].deleteGif);
var _default = gifRouter;
exports["default"] = _default;
//# sourceMappingURL=gif.route.js.map