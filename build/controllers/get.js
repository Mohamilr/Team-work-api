"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _database = _interopRequireDefault(require("../models/database"));

var get = {
  getAllArticlesGif: function getAllArticlesGif(req, res) {
    try {
      _jsonwebtoken["default"].verify(req.token, process.env.SECRET_KEY,
      /*#__PURE__*/
      function () {
        var _ref = (0, _asyncToGenerator2["default"])(
        /*#__PURE__*/
        _regenerator["default"].mark(function _callee(err, data) {
          var get, getQuery;
          return _regenerator["default"].wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!err) {
                    _context.next = 2;
                    break;
                  }

                  return _context.abrupt("return", res.status(403).json({
                    status: 'error',
                    error: 'incorrect token'
                  }));

                case 2:
                  get = "SELECT * FROM articles, gifs ";
                  _context.next = 5;
                  return _database["default"].query(get);

                case 5:
                  getQuery = _context.sent;

                  if (getQuery.rows[0]) {
                    _context.next = 8;
                    break;
                  }

                  return _context.abrupt("return", res.status(400).json({
                    status: 'error',
                    error: 'sorry, there are no articles or gifs available in the database'
                  }));

                case 8:
                  res.status(200).json({
                    status: 'success',
                    data: [getQuery.rowCount, getQuery.rows]
                  });

                case 9:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }());
    } catch (e) {
      console.log(e);
    }
  },
  getSingleArticle: function getSingleArticle(req, res) {
    var id = parseInt(req.params.id);

    try {
      _jsonwebtoken["default"].verify(req.token, process.env.SECRET_KEY,
      /*#__PURE__*/
      function () {
        var _ref2 = (0, _asyncToGenerator2["default"])(
        /*#__PURE__*/
        _regenerator["default"].mark(function _callee2(err, data) {
          var getSingleArticle, value, getSingleArticleQuery, comment;
          return _regenerator["default"].wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (!err) {
                    _context2.next = 2;
                    break;
                  }

                  return _context2.abrupt("return", res.status(403).json({
                    status: 'error',
                    error: 'incorrect token'
                  }));

                case 2:
                  // const getSingleArticle = `SELECT a.articleId, a.title, c.comment, c.commentId, c.authorId FROM articles a JOIN article_comments c ON a.articleId=$1`
                  getSingleArticle = "SELECT * FROM articles WHERE articleId=$1";
                  value = [id];
                  _context2.next = 6;
                  return _database["default"].query(getSingleArticle, value);

                case 6:
                  getSingleArticleQuery = _context2.sent;
                  _context2.next = 9;
                  return _database["default"].query("SELECT commentid, comment, authorid FROM article_comments WHERE articleId=".concat(id));

                case 9:
                  comment = _context2.sent;
                  res.status(200).json({
                    status: 'success',
                    data: {
                      id: getSingleArticleQuery.rows[0].articleid,
                      createdOn: getSingleArticleQuery.rows[0].createdon,
                      title: getSingleArticleQuery.rows[0].title,
                      article: getSingleArticleQuery.rows[0].article,
                      comment: comment.rows
                    }
                  });

                case 11:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function (_x3, _x4) {
          return _ref2.apply(this, arguments);
        };
      }());
    } catch (e) {
      console.log(e);
    }
  },
  getSingleGif: function getSingleGif(req, res) {
    var id = parseInt(req.params.id);

    try {
      _jsonwebtoken["default"].verify(req.token, process.env.SECRET_KEY,
      /*#__PURE__*/
      function () {
        var _ref3 = (0, _asyncToGenerator2["default"])(
        /*#__PURE__*/
        _regenerator["default"].mark(function _callee3(err, data) {
          var getSingleGif, value, getSingleGifQuery, comments;
          return _regenerator["default"].wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  if (!err) {
                    _context3.next = 2;
                    break;
                  }

                  return _context3.abrupt("return", res.status(403).json({
                    status: 'error',
                    error: 'incorrect token'
                  }));

                case 2:
                  getSingleGif = "SELECT * FROM gifs WHERE gifId=$1";
                  value = [id];
                  _context3.next = 6;
                  return _database["default"].query(getSingleGif, value);

                case 6:
                  getSingleGifQuery = _context3.sent;
                  _context3.next = 9;
                  return _database["default"].query("SELECT commentid, comment, authorid FROM gif_comments WHERE gifId=".concat(id));

                case 9:
                  comments = _context3.sent;
                  res.status(200).json({
                    status: 'success',
                    data: {
                      id: getSingleGifQuery.rows[0].gifid,
                      createdOn: getSingleGifQuery.rows[0].gifcreatedon,
                      title: getSingleGifQuery.rows[0].giftitle,
                      url: getSingleGifQuery.rows[0].image,
                      comments: comments.rows
                    }
                  });

                case 11:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));

        return function (_x5, _x6) {
          return _ref3.apply(this, arguments);
        };
      }());
    } catch (e) {
      console.log(e);
    }
  }
};
var _default = get;
exports["default"] = _default;
//# sourceMappingURL=get.js.map