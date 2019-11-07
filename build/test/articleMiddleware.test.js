"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _server = _interopRequireDefault(require("../server"));

_chai["default"].use(_chaiHttp["default"]);

_chai["default"].should();

describe('articleMiddleware', function () {
  describe('POST and PATCH', function () {
    var id = 1; // post

    it('should give an error if title length is less than 5', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/articles').set('Authorization', "bearer ".concat(process.env.TEST_TOKEN)).send({
        title: 'a ',
        article: 'i was an intern at Hotels.ng. i worked with different teams and was assigned to different projects. it was a great experience to be a part of HNG internship 6.',
        authorId: 1
      }).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
      });

      done();
    }); // 

    it('should give an error if article length is less than 100', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/articles').set('Authorization', "bearer ".concat(process.env.TEST_TOKEN)).send({
        title: 'my first article',
        article: 'i was an intern at Hotels.ng.',
        authorId: 1
      }).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
      });

      done();
    }); // patch

    it('should give an error if input length is less than 5', function (done) {
      _chai["default"].request(_server["default"]).patch("/api/v1/articles/".concat(id)).set('Authorization', "bearer ".concat(process.env.TEST_TOKEN)).send({
        title: 'a ',
        article: 'i was an intern at Hotels.ng. i worked with different teams and was assigned to different projects. it was a great experience to be a part of HNG internship 6.',
        authorId: 1
      }).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
      });

      done();
    }); // 

    it('should give an error if input length is less than 5', function (done) {
      _chai["default"].request(_server["default"]).patch("/api/v1/articles/".concat(id)).set('Authorization', "bearer ".concat(process.env.TEST_TOKEN)).send({
        title: 'my first article',
        article: 'i was an intern at Hotels.ng. ',
        authorId: 1
      }).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
      });

      done();
    });
  });
});
//# sourceMappingURL=articleMiddleware.test.js.map