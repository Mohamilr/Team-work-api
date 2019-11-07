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

var comments = {
  articleComment: function articleComment(req, res) {
    var id = parseInt(req.params.id);
    var _req$body = req.body,
        comment = _req$body.comment,
        authorId = _req$body.authorId;

    try {
      _jsonwebtoken["default"].verify(req.token, process.env.SECRET_KEY,
      /*#__PURE__*/
      function () {
        var _ref = (0, _asyncToGenerator2["default"])(
        /*#__PURE__*/
        _regenerator["default"].mark(function _callee(err, data) {
          var check, checkValue, checkQuery, comments, values, commentQuery;
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
                  if (!(!comment || !authorId)) {
                    _context.next = 4;
                    break;
                  }

                  return _context.abrupt("return", res.status(400).json({
                    status: 'error',
                    error: 'all fields are required'
                  }));

                case 4:
                  check = "SELECT * FROM articles WHERE articleid=$1";
                  checkValue = [id];
                  _context.next = 8;
                  return _database["default"].query(check, checkValue);

                case 8:
                  checkQuery = _context.sent;
                  comments = "INSERT INTO article_comments (comment, createdon, authorid, articleid)\n                                VALUES($1, $2, $3, $4) RETURNING *";
                  values = [comment, new Date().toLocaleString(), authorId, id];
                  _context.next = 13;
                  return _database["default"].query(comments, values);

                case 13:
                  commentQuery = _context.sent;
                  res.status(201).json({
                    status: 'success',
                    data: {
                      message: 'Comment successfully created',
                      createdOn: commentQuery.rows[0].createdon,
                      articleTitle: checkQuery.rows[0].title,
                      article: checkQuery.rows[0].article,
                      comment: commentQuery.rows[0].comment
                    }
                  });

                case 15:
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
  gifComment: function gifComment(req, res) {
    var id = parseInt(req.params.id);
    var _req$body2 = req.body,
        comment = _req$body2.comment,
        authorId = _req$body2.authorId;

    try {
      _jsonwebtoken["default"].verify(req.token, process.env.SECRET_KEY,
      /*#__PURE__*/
      function () {
        var _ref2 = (0, _asyncToGenerator2["default"])(
        /*#__PURE__*/
        _regenerator["default"].mark(function _callee2(err, data) {
          var check, checkValue, checkQuery, comments, values, commentQuery;
          return _regenerator["default"].wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (!(!comment || !authorId)) {
                    _context2.next = 2;
                    break;
                  }

                  return _context2.abrupt("return", res.status(400).json({
                    status: 'error',
                    error: 'all fields are required'
                  }));

                case 2:
                  ;

                  if (!err) {
                    _context2.next = 5;
                    break;
                  }

                  return _context2.abrupt("return", res.status(403).json({
                    status: 'error',
                    error: 'incorrect token'
                  }));

                case 5:
                  check = "SELECT * FROM gifs WHERE gifId=$1";
                  checkValue = [id];
                  _context2.next = 9;
                  return _database["default"].query(check, checkValue);

                case 9:
                  checkQuery = _context2.sent;
                  comments = "INSERT INTO gif_comments (comment, createdon, authorid, gifid)\n                                VALUES($1, $2, $3, $4) RETURNING *";
                  values = [comment, new Date().toLocaleString(), authorId, id];
                  _context2.next = 14;
                  return _database["default"].query(comments, values);

                case 14:
                  commentQuery = _context2.sent;
                  res.status(201).json({
                    status: 'success',
                    data: {
                      message: 'Comment successfully created',
                      createdOn: commentQuery.rows[0].createdon,
                      gifTitle: checkQuery.rows[0].title,
                      comment: commentQuery.rows[0].comment
                    }
                  });

                case 16:
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
  }
};
var _default = comments;
exports["default"] = _default;
//# sourceMappingURL=comments.js.map