"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _cloudinary = _interopRequireDefault(require("cloudinary"));

var _database = _interopRequireDefault(require("../models/database"));

var _cloudinary2 = _interopRequireDefault(require("../config/cloudinary.config"));

// configure cloudinary
var gifController = {
  postGif: function postGif(req, res) {
    var image = req.files.gif;
    var _req$body = req.body,
        gifTitle = _req$body.gifTitle,
        gifAuthorId = _req$body.gifAuthorId;

    try {
      _jsonwebtoken["default"].verify(req.token, process.env.SECRET_KEY,
      /*#__PURE__*/
      function () {
        var _ref = (0, _asyncToGenerator2["default"])(
        /*#__PURE__*/
        _regenerator["default"].mark(function _callee2(err, data) {
          return _regenerator["default"].wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (!(!image || !gifTitle || !gifAuthorId)) {
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
                  _cloudinary["default"].v2.uploader.upload(image.tempFilePath, {
                    resourse_type: 'gif'
                  }).then(
                  /*#__PURE__*/
                  function () {
                    var _ref2 = (0, _asyncToGenerator2["default"])(
                    /*#__PURE__*/
                    _regenerator["default"].mark(function _callee(result) {
                      var gif, values, gifQuery;
                      return _regenerator["default"].wrap(function _callee$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              gif = "INSERT INTO gifs (image, gifTitle, gifAuthorId , gifCreatedOn)\n            VALUES($1, $2, $3, $4) RETURNING *";
                              values = [result.url, gifTitle, gifAuthorId, new Date().toLocaleString()];
                              _context.next = 4;
                              return _database["default"].query(gif, values);

                            case 4:
                              gifQuery = _context.sent;
                              res.status(201).json({
                                status: 'success',
                                data: {
                                  gifId: gifQuery.rows[0].gifid,
                                  message: 'gif image successfully posted',
                                  createdOn: gifQuery.rows[0].createdon,
                                  title: gifQuery.rows[0].title,
                                  imageUrl: gifQuery.rows[0].image
                                }
                              });

                            case 6:
                            case "end":
                              return _context.stop();
                          }
                        }
                      }, _callee);
                    }));

                    return function (_x3) {
                      return _ref2.apply(this, arguments);
                    };
                  }())["catch"](function (e) {
                    return console.log(e);
                  });

                case 6:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }());
    } catch (e) {
      console.log(e);
    }
  },
  deleteGif: function deleteGif(req, res) {
    var id = parseInt(req.params.id);

    try {
      _jsonwebtoken["default"].verify(req.token, process.env.SECRET_KEY,
      /*#__PURE__*/
      function () {
        var _ref3 = (0, _asyncToGenerator2["default"])(
        /*#__PURE__*/
        _regenerator["default"].mark(function _callee3(err, data) {
          var deleteGif, value, deleteGifQuery;
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
                  deleteGif = "DELETE FROM gifs WHERE gifId=$1";
                  value = [id];
                  _context3.next = 6;
                  return _database["default"].query(deleteGif, value);

                case 6:
                  deleteGifQuery = _context3.sent;
                  res.status(200).json({
                    status: 'success',
                    data: {
                      message: 'gif post successfully deleted'
                    }
                  });

                case 8:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));

        return function (_x4, _x5) {
          return _ref3.apply(this, arguments);
        };
      }());
    } catch (e) {
      console.log(e);
    }
  }
};
var _default = gifController;
exports["default"] = _default;
//# sourceMappingURL=gifs.js.map