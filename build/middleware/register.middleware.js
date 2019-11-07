"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var registerMiddleware = {
  checkSignUp: function checkSignUp(req, res, next) {
    var _req$body = req.body,
        email = _req$body.email,
        password = _req$body.password,
        gender = _req$body.gender,
        department = _req$body.department,
        address = _req$body.address;

    if (!/[\w]+@[a-zA-Z]+\.com$/.test(email)) {
      return res.status(400).json({
        status: 'error',
        error: 'invalid email format'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        status: 'error',
        error: 'password length should be more than six'
      });
    }

    if (gender.length < 3) {
      return res.status(400).json({
        status: 'error',
        error: 'gender input length should be more than three'
      });
    }

    if (department.length < 3) {
      return res.status(400).json({
        status: 'error',
        error: 'department input length should be more than three'
      });
    }

    if (address.length < 3) {
      return res.status(400).json({
        status: 'error',
        error: 'address input length should be more than three'
      });
    }

    next();
  }
};
var _default = registerMiddleware;
exports["default"] = _default;
//# sourceMappingURL=register.middleware.js.map