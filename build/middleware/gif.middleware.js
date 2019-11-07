"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var gifMiddleware = {
  checkPostGif: function checkPostGif(req, res, next) {
    var image = req.files.gif;

    if (!image.name.match(/.(gif)$/)) {
      return res.status(400).json({
        status: 'error',
        error: 'image upload must be a gif'
      });
    }

    next();
  }
};
var _default = gifMiddleware;
exports["default"] = _default;
//# sourceMappingURL=gif.middleware.js.map