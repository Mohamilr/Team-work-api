"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _pg = _interopRequireDefault(require("pg"));

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config();

var connection = {
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT
};
var pool = new _pg["default"].Pool(connection);
pool.on('connect', function () {}); // user table

var userTable =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    var userTableQuery;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            userTableQuery = "CREATE TABLE IF NOT EXISTS\n    employee(\n        authorId SERIAL PRIMARY KEY NOT NULL UNIQUE,\n        firstName VARCHAR(50) NOT NULL,\n        lastName VARCHAR(50) NOT NULL,\n        email VARCHAR(50) NOT NULL,\n        password VARCHAR(200) NOT NULL,\n        gender VARCHAR(20) NOT NULL,\n        jobRole VARCHAR(50) NOT NULL,\n        department VARCHAR(100) NOT NULL,\n        address VARCHAR(100) NOT NULL\n    )";
            _context.prev = 1;
            _context.next = 4;
            return pool.query(userTableQuery);

          case 4:
            console.log('employee table created');
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](1);
            console.log(_context.t0);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 7]]);
  }));

  return function userTable() {
    return _ref.apply(this, arguments);
  };
}(); // article table


var articleTable =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2() {
    var articleTableQuery;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            articleTableQuery = "CREATE TABLE IF NOT EXISTS\n    articles(\n        articleId SERIAL PRIMARY KEY NOT NULL UNIQUE,\n        title VARCHAR(100) NOT NULL,\n        article VARCHAR(5000) NOT NULL,\n        authorId INT NOT NULL,\n        createdOn VARCHAR(50) NOT NULL,\n        FOREIGN KEY(authorId) REFERENCES employee(authorId)  ON DELETE CASCADE ON UPDATE CASCADE\n    )";
            _context2.prev = 1;
            _context2.next = 4;
            return pool.query(articleTableQuery);

          case 4:
            console.log('article table created');
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](1);
            console.log(_context2.t0);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 7]]);
  }));

  return function articleTable() {
    return _ref2.apply(this, arguments);
  };
}(); // // //  article comment table


var articleCommentTable =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3() {
    var articleCommentTableQuery;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            articleCommentTableQuery = "CREATE TABLE IF NOT EXISTS\n    article_comments(\n        commentId SERIAL PRIMARY KEY NOT NULL UNIQUE,\n        comment VARCHAR(300) NOT NULL,\n        createdOn VARCHAR(50) NOT NULL,\n        authorId INT NOT NULL,\n        articleId INT NOT NULL,\n        FOREIGN KEY(articleId) REFERENCES articles(articleId) ON UPDATE CASCADE ON DELETE CASCADE,\n        FOREIGN KEY(authorId) REFERENCES employee(authorId) ON UPDATE CASCADE ON DELETE CASCADE\n    )";
            _context3.prev = 1;
            _context3.next = 4;
            return pool.query(articleCommentTableQuery);

          case 4:
            console.log('article comment table created');
            _context3.next = 10;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](1);
            console.log(_context3.t0);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 7]]);
  }));

  return function articleCommentTable() {
    return _ref3.apply(this, arguments);
  };
}(); // gif table


var gifTable =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4() {
    var gifTableQuery;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            gifTableQuery = "CREATE TABLE IF NOT EXISTS\n    gifs(\n        gifId SERIAL PRIMARY KEY NOT NULL UNIQUE,\n        image VARCHAR(500) NOT NULL,\n        gifTitle VARCHAR(50) NOT NULL,\n        gifAuthorId INT NOT NULL,\n        gifCreatedOn VARCHAR(50) NOT NULL,\n        FOREIGN KEY(gifAuthorId) REFERENCES employee(authorId) ON DELETE CASCADE ON UPDATE CASCADE\n    )";
            _context4.prev = 1;
            _context4.next = 4;
            return pool.query(gifTableQuery);

          case 4:
            console.log('gif table created');
            _context4.next = 10;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](1);
            console.log(_context4.t0);

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 7]]);
  }));

  return function gifTable() {
    return _ref4.apply(this, arguments);
  };
}(); // // // gif comment table


var gifCommentTable =
/*#__PURE__*/
function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5() {
    var gifCommentTableQuery;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            gifCommentTableQuery = "CREATE TABLE IF NOT EXISTS\n    gif_comments(\n        commentId SERIAL PRIMARY KEY NOT NULL UNIQUE,\n        comment VARCHAR(300) NOT NULL,\n        createdOn VARCHAR(50) NOT NULL,\n        authorId INTEGER,\n        gifId INT,\n        FOREIGN KEY(gifId) REFERENCES gifs(gifId) ON UPDATE CASCADE ON DELETE CASCADE,\n        FOREIGN KEY(authorId) REFERENCES employee(authorId) \n    )";
            _context5.prev = 1;
            _context5.next = 4;
            return pool.query(gifCommentTableQuery);

          case 4:
            console.log('gif comment table created');
            _context5.next = 10;
            break;

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](1);
            console.log(_context5.t0);

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 7]]);
  }));

  return function gifCommentTable() {
    return _ref5.apply(this, arguments);
  };
}(); // drop table
// const dropTable = async () => {
//     const dropTableQuery = `DROP TABLE IF EXISTS gifs`
//     try{
//         await pool.query(dropTableQuery)
//         console.log('table dropped')
//     }
//     catch(e) {
//         console.log(e)
//     }
// }
// user


userTable(); // article

articleTable(); // gif

gifTable(); // article comment

articleCommentTable(); // gif comment

gifCommentTable(); // dropTable
// dropTable();

var _default = pool;
exports["default"] = _default;
//# sourceMappingURL=database.js.map