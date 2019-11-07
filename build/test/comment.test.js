"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _server = _interopRequireDefault(require("../server"));

// import token from './register.test';
_chai["default"].use(_chaiHttp["default"]);

_chai["default"].should();

describe.skip('POST comment', function () {
  // test article comment
  describe('POST article comment', function () {
    var id = 2; // error on empty body values

    it('should give an error on empty body values', function (done) {
      _chai["default"].request(_server["default"]).post("api/v1/articles/".concat(id, "/comment")).set('Authorization', "bearer ".concat(process.env.TEST_TOKEN)).send({
        comment: '',
        authorId: 1
      }).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
      });

      done();
    }); // error on wrong token

    it('should give an error on wrong token', function (done) {
      _chai["default"].request(_server["default"]).post("api/v1/articles/".concat(id, "/comment")).set('Authorization', "bearer wrong token").send({
        comment: 'nice article.',
        authorId: 1
      }).end(function (err, res) {
        res.should.have.status(403);
        res.body.should.be.a('object');
      });

      done();
    }); // post a comment

    it('should post an article comment', function (done) {
      _chai["default"].request(_server["default"]).post("api/v1/articles/".concat(id, "/comment")).set('Authorization', "bearer ".concat(process.env.TEST_TOKEN)).send({
        comment: 'nice article.',
        authorId: 1
      }).end(function (err, res) {
        res.should.have.status(201);
        res.body.should.be.a('object');
      });

      done();
    });
  }); // test gif comment

  describe('POST gif comment', function () {
    var id = 1; // error on empty body values

    it('should give an error on empty body values', function (done) {
      _chai["default"].request(_server["default"]).post("/api/v1/gifs/".concat(id, "/comment")).set('Authorization', "bearer ".concat(process.env.TEST_TOKEN)).send({
        comment: '',
        authorId: 1
      }).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
      });

      done();
    }); // error on wromg token

    it('should give an error on wrong token', function (done) {
      _chai["default"].request(_server["default"]).post("/api/v1/gifs/".concat(id, "/comment")).set('Authorization', "bearer wrong token").send({
        comment: 'what a funny gif.',
        authorId: 1
      }).end(function (err, res) {
        res.should.have.status(403);
        res.body.should.be.a('object');
      });

      done();
    }); // post gif comment

    it('should post a gif comment', function (done) {
      _chai["default"].request(_server["default"]).post("/api/v1/gifs/".concat(id, "/comment")).set('Authorization', "bearer ".concat(process.env.TEST_TOKEN)).send({
        comment: 'what a funny gif.',
        authorId: 1
      }).end(function (err, res) {
        res.should.have.status(201);
        res.body.should.be.a('object');
      });

      done();
    });
  });
});
//# sourceMappingURL=comment.test.js.map