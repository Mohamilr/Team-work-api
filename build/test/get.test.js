"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _server = _interopRequireDefault(require("../server"));

_chai["default"].use(_chaiHttp["default"]);

_chai["default"].should();

describe('GET', function () {
  describe('GET feed', function () {
    // error on wrong token
    it('should give an error on wrong token', function (done) {
      _chai["default"].request(_server["default"]).get('/api/v1/feed').set('Authorization', "bearer wrong token").end(function (err, res) {
        res.should.have.status(403);
        res.body.should.be.a('object');
      });

      done();
    }); // no feed available
    // it('should give an error if there are no feeds', (done) => {
    //     chai.request(app)
    //     .get('/api/v1/feed')
    //     .set('Authorization', `bearer ${process.env.TEST_TOKEN}`)
    //     .end((err, res) => {
    //         res.should.have.status(400);
    //         res.body.should.be.a('object');
    //     })
    //     done();
    // })
    // get all feeds

    it('should get all articles and gif', function (done) {
      _chai["default"].request(_server["default"]).get('/api/v1/feed').set('Authorization', "bearer ".concat(process.env.TEST_TOKEN)).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
      });

      done();
    });
  }); // test get single article

  describe('GET single article', function () {
    var id = 1; // error on wrong token

    it('should give an error on wrong token', function (done) {
      _chai["default"].request(_server["default"]).get("/api/v1/articles/".concat(id)).set('Authorization', "bearer wrong token").end(function (err, res) {
        res.should.have.status(403);
        res.body.should.be.a('object');
      });

      done();
    }); // get a single article

    it('should get a single article', function (done) {
      _chai["default"].request(_server["default"]).get("/api/v1/articles/".concat(id)).set('Authorization', "bearer ".concat(process.env.TEST_TOKEN)).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
      });

      done();
    });
  }); // test get single gif

  describe('GET single gif', function () {
    var id = 1; // error on wrong token

    it('should give an error on wrong token', function (done) {
      _chai["default"].request(_server["default"]).get("/api/v1/gifs/".concat(id)).set('Authorization', "bearer wrong token").end(function (err, res) {
        res.should.have.status(403);
        res.body.should.be.a('object');
      });

      done();
    }); // get a single gif

    it('should give an error on wrong token', function (done) {
      _chai["default"].request(_server["default"]).get("/api/v1/gifs/".concat(id)).set('Authorization', "bearer ".concat(process.env.TEST_TOKEN)).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
      });

      done();
    });
  });
});
//# sourceMappingURL=get.test.js.map