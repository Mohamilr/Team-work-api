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

var articleController = {
  createArticle: function createArticle(req, res) {
    var _req$body = req.body,
        title = _req$body.title,
        article = _req$body.article,
        authorId = _req$body.authorId;

    try {
      _jsonwebtoken["default"].verify(req.token, process.env.SECRET_KEY,
      /*#__PURE__*/
      function () {
        var _ref = (0, _asyncToGenerator2["default"])(
        /*#__PURE__*/
        _regenerator["default"].mark(function _callee(err, data) {
          var create, values, createQuery;
          return _regenerator["default"].wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!(!title || !article || !authorId)) {
                    _context.next = 2;
                    break;
                  }

                  return _context.abrupt("return", res.status(400).json({
                    status: 'error',
                    error: 'all fields are required'
                  }));

                case 2:
                  ;

                  if (!err) {
                    _context.next = 5;
                    break;
                  }

                  return _context.abrupt("return", res.status(403).json({
                    status: 'error',
                    error: 'incorrect token'
                  }));

                case 5:
                  ;
                  create = "INSERT INTO articles (title, article, authorid, createdon)\n                                VALUES($1, $2, $3, $4) RETURNING *";
                  values = [title, article, authorId, new Date().toLocaleString()];
                  _context.next = 10;
                  return _database["default"].query(create, values);

                case 10:
                  createQuery = _context.sent;
                  res.status(201).json({
                    status: 'success',
                    data: {
                      message: 'Article successfully posted',
                      articleId: createQuery.rows[0].articleid,
                      createdOn: createQuery.rows[0].createdon,
                      title: createQuery.rows[0].title,
                      article: createQuery.rows[0].article
                    }
                  });

                case 12:
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
  modifyArticle: function modifyArticle(req, res) {
    var id = parseInt(req.params.id);

    try {
      _jsonwebtoken["default"].verify(req.token, process.env.SECRET_KEY,
      /*#__PURE__*/
      function () {
        var _ref2 = (0, _asyncToGenerator2["default"])(
        /*#__PURE__*/
        _regenerator["default"].mark(function _callee2(err, data) {
          var check, checkValue, checkQuery, title, article, modify, value, modifyQuery;
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
                  ;
                  check = "SELECT * FROM articles WHERE articleid=$1";
                  checkValue = [id];
                  _context2.next = 7;
                  return _database["default"].query(check, checkValue);

                case 7:
                  checkQuery = _context2.sent;
                  title = req.body.title || checkQuery.rows[0].title;
                  article = req.body.article || checkQuery.rows[0].article;
                  modify = "UPDATE articles SET title=$1, article=$2, createdon=$3 WHERE articleid=$4 RETURNING *";
                  value = [title, article, new Date().toLocaleString(), id];
                  _context2.next = 14;
                  return _database["default"].query(modify, value);

                case 14:
                  modifyQuery = _context2.sent;
                  res.status(200).json({
                    status: 'success',
                    data: {
                      message: 'Article successfully updated',
                      title: title,
                      article: article,
                      modifiedOn: modifyQuery.rows[0].createdon
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
  },
  deleteArticle: function deleteArticle(req, res) {
    var id = parseInt(req.params.id);

    try {
      _jsonwebtoken["default"].verify(req.token, process.env.SECRET_KEY,
      /*#__PURE__*/
      function () {
        var _ref3 = (0, _asyncToGenerator2["default"])(
        /*#__PURE__*/
        _regenerator["default"].mark(function _callee3(err, data) {
          var remove, value, removeQuery;
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
                  ;
                  remove = "DELETE FROM articles WHERE articleid=$1";
                  value = [id];
                  _context3.next = 7;
                  return _database["default"].query(remove, value);

                case 7:
                  removeQuery = _context3.sent;
                  res.status(200).json({
                    status: 'success',
                    data: {
                      message: 'Article successfully deleted'
                    }
                  });

                case 9:
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
var _default = articleController;
exports["default"] = _default;
//# sourceMappingURL=articles.js.map