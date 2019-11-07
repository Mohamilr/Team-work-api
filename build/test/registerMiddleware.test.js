"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _server = _interopRequireDefault(require("../server"));

_chai["default"].use(_chaiHttp["default"]);

_chai["default"].should();

describe('POST sign up', function () {
  it('should give error on incorrect email format', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/auth/create-user').send({
      firstName: 'mohammed',
      lastName: 'ibrahim',
      email: 'useremail',
      password: 'administrator',
      gender: 'male',
      jobRole: 'assistant',
      department: 'engineer',
      address: '4, alomosho'
    }).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.be.a('object');
    });

    done();
  });
  it('should give error if password length is less than 6', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/auth/create-user').send({
      firstName: 'mohammed',
      lastName: 'ibrahim',
      email: 'user@email.com',
      password: 'admin',
      gender: 'male',
      jobRole: 'assistant',
      department: 'engineer',
      address: '4, alomosho'
    }).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.be.a('object');
    });

    done();
  });
  it('should give error if gender length is less than 3', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/auth/create-user').send({
      firstName: 'mohammed',
      lastName: 'ibrahim',
      email: 'user@email.com',
      password: 'admin',
      gender: 'mal',
      jobRole: 'assistant',
      department: 'engineer',
      address: '4, alomosho'
    }).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.be.a('object');
    });

    done();
  });
  it('should give error if department length is less than 3', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/auth/create-user').send({
      firstName: 'mohammed',
      lastName: 'ibrahim',
      email: 'user@email.com',
      password: 'admin',
      gender: 'male',
      jobRole: 'assistant',
      department: 'en',
      address: '4, alomosho'
    }).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.be.a('object');
    });

    done();
  });
  it('should give error if address length is less than 3', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/auth/create-user').send({
      firstName: 'mohammed',
      lastName: 'ibrahim',
      email: 'user@email.com',
      password: 'admin',
      gender: 'male',
      jobRole: 'assistant',
      department: 'en',
      address: '4,'
    }).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.be.a('object');
    });

    done();
  });
});
//# sourceMappingURL=registerMiddleware.test.js.map