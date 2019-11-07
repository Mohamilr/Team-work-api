"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _fs = _interopRequireDefault(require("fs"));

var _server = _interopRequireDefault(require("../server"));

// import token from './register.test';
_chai["default"].use(_chaiHttp["default"]);

_chai["default"].should();

describe('gif route', function () {
  // test POST
  describe.skip('create gif', function () {
    // error on empty body value
    it('should give error on empty body value', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/gifs').set('Authorization', "bearer ".concat(process.env.TEST_TOKEN)).attach('gif', _fs["default"].readFileSync('c:/Users/DAMILOLA/Desktop/DevCWithAndela/gif.gif'), 'gif.gif').field('gifTitle', '').field('gifAuthorId', 1).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
      });

      done();
    }); // error on wrong token

    it('should give an error on wrong token', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/gifs').set('Authorization', "bearer wrong token").attach('gif', _fs["default"].readFileSync('c:/Users/DAMILOLA/Desktop/DevCWithAndela/gif.gif'), 'gif.gif').field('gifTitle', 'my gif').field('gifAuthorId', 1).end(function (err, res) {
        res.should.have.status(403);
        res.body.should.be.a('object');
      });

      done();
    }); // test gif upload

    it('should post a gif', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/gifs').set('Authorization', "bearer ".concat(process.env.TEST_TOKEN)).attach('gif', _fs["default"].readFileSync('c:/Users/DAMILOLA/Desktop/DevCWithAndela/gif.gif'), 'gif.gif').field('gifTitle', 'my gif').field('gifAuthorId', 1).end(function (err, res) {
        res.should.have.status(201);
        res.body.should.be.a('object');
      });

      done();
    });
  }); // test DELETE

  describe('delete gif', function () {
    var id = 2; // error on wrong token

    it('should give an error on wrong token', function (done) {
      _chai["default"].request(_server["default"])["delete"]("/api/v1/gifs/".concat(id)).set('Authorization', "bearer wrong token").end(function (err, res) {
        res.should.have.status(403);
        res.body.should.be.a('object');
      });

      done();
    }); // delete

    it('should delete a selected gif', function (done) {
      _chai["default"].request(_server["default"])["delete"]("/api/v1/gifs/".concat(id)).set('Authorization', "bearer ".concat(process.env.TEST_TOKEN)).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
      });

      done();
    });
  });
});
//# sourceMappingURL=gif.test.js.map