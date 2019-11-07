"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var articleCheck = {
  checkPost_ModifyArticle: function checkPost_ModifyArticle(req, res, next) {
    var _req$body = req.body,
        title = _req$body.title,
        article = _req$body.article;

    if (title.length < 3) {
      return res.status(400).json({
        status: 'error',
        error: 'title input length should be more than five'
      });
    }

    if (article.length < 100) {
      return res.status(400).json({
        status: 'error',
        error: 'article input length should be more than hundred'
      });
    }

    next();
  }
};
var _default = articleCheck;
exports["default"] = _default;
//# sourceMappingURL=article.middleware.js.map