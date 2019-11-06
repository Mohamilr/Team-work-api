import chai from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';

import app from '../server';

chai.use(chaiHttp);
chai.should();

describe.skip('create gif', () => {
    // 
    it('should give error if image is not .gif', (done) => {
        chai.request(app)
            .post('/api/v1/gifs')
            .set('Authorization', `bearer ${process.env.TEST_TOKEN}`)
            .attach('gif', fs.readFileSync('c:/Users/DAMILOLA/Desktop/DevCWithAndela/122.jpg'), '122.jpg')
            .field('gifTitle', 'my funny gif')
            .field('gifAuthorId', 1)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
            })
        done();
    })
})