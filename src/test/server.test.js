import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../server';

chai.use(chaiHttp);
chai.should();

describe('SERVER.js', () => {
    // welcome route
    it('should visit welcome route', (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
            })
        done();
    });
})