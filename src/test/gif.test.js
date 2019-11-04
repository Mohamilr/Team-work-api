import chai from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';

import app from '../server';
// import image from '../../../'
import token from './register.test';

chai.use(chaiHttp);
chai.should();

describe('gif route', () => {
    describe('create gif', () => {
        // error on empty body value
        it('should give error on empty body value', async (done) => {
            chai.request(app)
                .post('/api/v1/gifs')
                .set('Authorization', `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vaGFtbWVkIiwicGFzc3dvcmQiOiJpYnJhaGltIiwiaWF0IjoxNTcyNzUyNjE1LCJleHAiOjE1NzI4MzkwMTV9.aNUBP0nNhk5etK-Fb98UzDQOZH1sPIrnbFsAEsRiAVo`)
                .attach('gif', fs.readFileSync('c:/Users/DAMILOLA/Desktop/DevCWithAndela/gif.gif'), 'gif.gif')
                .field('gifTitle', '')
                .field('gifAuthorId', 1)
                .end((err, res) => {
                    res.should.have.status(400)
                })
            done();
        })

        // error on wrong token
        it('should give error on empty body value', async (done) => {
            chai.request(app)
                .post('/api/v1/gifs')
                .set('Authorization', `bearer wrong token`)
                .attach('gif', fs.readFileSync('c:/Users/DAMILOLA/Desktop/DevCWithAndela/gif.gif'), 'gif.gif')
                .field('gifTitle', 'my gif')
                .field('gifAuthorId', 1)
                .end((err, res) => {
                    res.should.have.status(403)
                })
            done();
        })

        // test gif upload
        it('should give error on empty body value', async (done) => {
            chai.request(app)
                .post('/api/v1/gifs')
                .set('Authorization', `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vaGFtbWVkIiwicGFzc3dvcmQiOiJpYnJhaGltIiwiaWF0IjoxNTcyNzUyNjE1LCJleHAiOjE1NzI4MzkwMTV9.aNUBP0nNhk5etK-Fb98UzDQOZH1sPIrnbFsAEsRiAVo`)
                .attach('gif', fs.readFileSync('c:/Users/DAMILOLA/Desktop/DevCWithAndela/gif.gif'), 'gif.gif')
                .field('gifTitle', 'my gif')
                .field('gifAuthorId', 1)
                .end((err, res) => {
                    res.should.have.status(201)
                })
            done();
        })
    })
})