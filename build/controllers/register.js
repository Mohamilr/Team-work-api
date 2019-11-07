"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _database = _interopRequireDefault(require("../models/database"));

var register = {
  signUP: function () {
    var _signUP = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(req, res) {
      var _req$body, firstName, lastName, email, password, gender, jobRole, department, address, checkQuery, value, check, salt, hashedPassword, signUpQuery, userValue, signUpQuerys;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _req$body = req.body, firstName = _req$body.firstName, lastName = _req$body.lastName, email = _req$body.email, password = _req$body.password, gender = _req$body.gender, jobRole = _req$body.jobRole, department = _req$body.department, address = _req$body.address;
              _context.prev = 1;

              if (!(!firstName || !lastName || !email || !password || !gender || !jobRole || !department || !address)) {
                _context.next = 4;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                status: 'error',
                error: 'all fields are required'
              }));

            case 4:
              ;
              checkQuery = "SELECT * FROM employee WHERE email=$1";
              value = [email];
              _context.next = 9;
              return _database["default"].query(checkQuery, value);

            case 9:
              check = _context.sent;

              if (!check.rows[0]) {
                _context.next = 12;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                status: 'error',
                error: 'user already exist'
              }));

            case 12:
              _context.next = 14;
              return _bcrypt["default"].genSalt(10);

            case 14:
              salt = _context.sent;
              _context.next = 17;
              return _bcrypt["default"].hash(password, salt);

            case 17:
              hashedPassword = _context.sent;
              signUpQuery = "INSERT INTO employee (firstName, lastName, email, password, gender, jobRole, department, address)\n            VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *";
              userValue = [firstName, lastName, email, hashedPassword, gender, jobRole, department, address];
              _context.next = 22;
              return _database["default"].query(signUpQuery, userValue);

            case 22:
              signUpQuerys = _context.sent;

              _jsonwebtoken["default"].sign({
                email: email,
                password: password
              }, process.env.SECRET_KEY, {
                expiresIn: '24h'
              }, function (err, token) {
                res.status(201).json({
                  status: 'success',
                  data: {
                    message: 'user account successfully created',
                    token: token,
                    authorId: signUpQuerys.rows[0].authorid
                  }
                });
              });

              _context.next = 29;
              break;

            case 26:
              _context.prev = 26;
              _context.t0 = _context["catch"](1);
              console.log(_context.t0);

            case 29:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 26]]);
    }));

    function signUP(_x, _x2) {
      return _signUP.apply(this, arguments);
    }

    return signUP;
  }(),
  logIn: function () {
    var _logIn = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2(req, res) {
      var _req$body2, email, password, _logIn2, value, logInQuery;

      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
              _context2.prev = 1;

              if (!(!email || !password)) {
                _context2.next = 4;
                break;
              }

              return _context2.abrupt("return", res.status(400).json({
                status: 'error',
                error: 'all fields are required'
              }));

            case 4:
              _logIn2 = "SELECT * FROM employee WHERE email=$1";
              value = [email];
              _context2.next = 8;
              return _database["default"].query(_logIn2, value);

            case 8:
              logInQuery = _context2.sent;

              if (logInQuery.rows[0]) {
                _context2.next = 11;
                break;
              }

              return _context2.abrupt("return", res.status(400).json({
                status: 'error',
                error: 'email does not exist, please sign up'
              }));

            case 11:
              _bcrypt["default"].compare(password, logInQuery.rows[0].password, function (err, result) {
                if (email === logInQuery.rows[0].email && result === true) {
                  _jsonwebtoken["default"].sign({
                    email: email,
                    password: password
                  }, process.env.SECRET_KEY, {
                    expiresIn: '24h'
                  }, function (err, token) {
                    res.status(201).json({
                      status: 'success',
                      message: 'user successfully loged in',
                      data: {
                        token: token,
                        authorId: logInQuery.rows[0].authorid
                      }
                    });
                  });
                } else {
                  res.status(403).json({
                    status: 'error',
                    error: 'token not generated, incorrect email or password'
                  });
                }
              });

              _context2.next = 17;
              break;

            case 14:
              _context2.prev = 14;
              _context2.t0 = _context2["catch"](1);
              console.log(_context2.t0);

            case 17:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 14]]);
    }));

    function logIn(_x3, _x4) {
      return _logIn.apply(this, arguments);
    }

    return logIn;
  }(),
  verifyToken: function verifyToken(req, res, next) {
    var headers = req.headers['authorization'];

    if (typeof headers !== 'undefined') {
      var beareHeader = headers.split(' ');
      var token = beareHeader[1];
      req.token = token;
      next();
    } else {
      res.status(403).json({
        status: 'error',
        error: 'forbidden'
      });
    }
  }
};
var _default = register;
exports["default"] = _default;
//# sourceMappingURL=register.js.map