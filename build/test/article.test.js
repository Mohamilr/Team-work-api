"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _server = _interopRequireDefault(require("../server"));

// token
// import token from './register.test';
_chai["default"].use(_chaiHttp["default"]);

_chai["default"].should();

describe('articles', function () {
  describe('create article', function () {
    // error om wrong token
    it('should give error on wrong token', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/articles').set('Authorization', "bearer wrong token").send({
        title: 'my first official project',
        article: 'i was an intern at Hotels.ng. i worked with different teams and was assigned to different projects. it was a great experience to be a part of HNG internship 6.',
        authorId: 1
      }).end(function (err, res) {
        res.should.have.status(403);
        res.body.should.be.a('object');
      });

      done();
    }); // error on empty body values

    it('should give error on empty body values', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/articles').set('Authorization', "bearer ".concat(process.env.TEST_TOKEN)).send({
        title: 'my first official project',
        article: '',
        authorId: 1
      }).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
      });

      done();
    });
    it('should create a new article', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/articles').set('Authorization', "bearer ".concat(process.env.TEST_TOKEN)).send({
        title: 'my first official project',
        article: 'i was an intern at Hotels.ng. i worked with different teams and was assigned to different projects. it was a great experience to be a part of HNG internship 6.',
        authorId: 1
      }).end(function (err, res) {
        res.should.have.status(201);
        res.body.should.be.a('object');
      });

      done();
    });
  }); // test modify route

  describe('PATCH modify article', function () {
    // give error on wrong token
    var id = 2;
    it('should give an error on wrong token', function (done) {
      _chai["default"].request(_server["default"]).patch("/api/v1/articles/".concat(id)).set('Authorization', "bearer wrong token").send({
        title: 'vacation',
        article: 'i was an intern at Hotels.ng. i worked with different teams and was assigned to different projects. it was a great experience to be a part of HNG internship 6.'
      }).end(function (err, res) {
        res.should.have.status(403);
        res.body.should.be.a('object');
      });

      done();
    }); // modify an article

    it('should modify an article', function (done) {
      _chai["default"].request(_server["default"]).patch("/api/v1/articles/".concat(id)).set('Authorization', "bearer ".concat(process.env.TEST_TOKEN)).send({
        title: 'vacation',
        article: 'i was an intern at Hotels.ng. i worked with different teams and was assigned to different projects. it was a great experience to be a part of HNG internship 6.'
      }).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
      });

      done();
    });
  }); // test delete route

  describe('delete article', function () {
    // error on wrong token
    var id = 2;
    it('should delete an article', function (done) {
      _chai["default"].request(_server["default"])["delete"]("/api/v1/articles/".concat(id)).set('Authorization', "bearer wrong token").end(function (err, res) {
        res.should.have.status(403);
        res.body.should.be.a('object');
      });

      done();
    }); // delete an article

    it('should delete an article', function (done) {
      _chai["default"].request(_server["default"])["delete"]("/api/v1/articles/".concat(id)).set('Authorization', "bearer ".concat(process.env.TEST_TOKEN)).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
      });

      done();
    });
  });
});
//# sourceMappingURL=article.test.js.map