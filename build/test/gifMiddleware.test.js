"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _fs = _interopRequireDefault(require("fs"));

var _server = _interopRequireDefault(require("../server"));

_chai["default"].use(_chaiHttp["default"]);

_chai["default"].should();

describe.skip('create gif', function () {
  // 
  it('should give error if image is not .gif', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/gifs').set('Authorization', "bearer ".concat(process.env.TEST_TOKEN)).attach('gif', _fs["default"].readFileSync('c:/Users/DAMILOLA/Desktop/DevCWithAndela/122.jpg'), '122.jpg').field('gifTitle', 'my funny gif').field('gifAuthorId', 1).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.be.a('object');
    });

    done();
  });
});
//# sourceMappingURL=gifMiddleware.test.js.map