"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _server = _interopRequireDefault(require("../server"));

_chai["default"].use(_chaiHttp["default"]);

_chai["default"].should(); // let signUpToken = null;
// let token = '';


describe('POST register', function () {
  // error if fields are empty
  describe('POST sign up', function () {
    it('should give error if fields are empty', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/auth/create-user').send({
        firstName: '',
        lastName: '',
        email: 'new usermkmkm',
        password: 'admin',
        gender: 'male',
        jobRole: 'assistant',
        department: '',
        address: '4, alomosho'
      }).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
      });

      done();
    }); // error if a user already exists

    it('should give error is a user already exists', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/auth/create-user').send({
        firstName: 'mama',
        lastName: 'omo',
        email: 'mohammed',
        password: 'ibrahim',
        gender: 'male',
        jobRole: 'assistant',
        department: 'engineer',
        address: '4, alomosho'
      }).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
      });

      done();
    }); // register new user

    it('should sign up a user', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/auth/create-user').send({
        firstName: 'mohammed',
        lastName: 'ibrahim',
        email: 'ibrahim@gmail.com',
        password: 'administrator',
        gender: 'male',
        jobRole: 'assistant',
        department: 'engineer',
        address: '4, alomosho'
      }).end(function (err, res) {
        res.should.have.status(201);
        res.body.should.be.a('object');
      });

      done();
    });
  }); // test log in
  // error if fields are empty

  describe('POST login', function () {
    it('should give error if fields are empty', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/auth/signin').send({
        email: 'new usermkmkm',
        password: ''
      }).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
      });

      done();
    }); // error if user does not exist

    it('should give error if user does not exist', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/auth/signin').send({
        email: 'non existing user',
        password: 'password'
      }).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
      });

      done();
    }); // login a user

    it('should log in an existing user', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/auth/signin').send({
        email: 'mohammed',
        password: 'ibrahim'
      }).end(function (err, res) {
        res.should.have.status(201);
        res.body.should.be.a('object'); // token = res.body.data.token
      });

      done();
    }); // error for incorrect email or password

    it('should give error for incorrect email or password', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/auth/signin').send({
        email: 'new',
        password: 'bypass'
      }).end(function (err, res) {
        res.should.have.status(403);
        res.body.should.be.a('object');
      });

      done();
    });
  });
}); // export default token;
//# sourceMappingURL=register.test.js.map