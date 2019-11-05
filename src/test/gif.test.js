import chai from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';

import app from '../server';

// import token from './register.test';
chai.use(chaiHttp);
chai.should();

describe.skip('gif route', () => {
    // test POST
    describe('create gif', () => {
        // error on empty body value
        it('should give error on empty body value', (done) => {
            chai.request(app)
                .post('/api/v1/gifs')
                .set('Authorization', `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vaGFtbWVkIiwicGFzc3dvcmQiOiJpYnJhaGltIiwiaWF0IjoxNTcyODc1ODk2LCJleHAiOjE1NzI5NjIyOTZ9.Xd1C7c4T4DrQY5hZV0-J7dNmH1ioqwuH-956yDLMLlE`)
                .attach('gif', fs.readFileSync('c:/Users/DAMILOLA/Desktop/DevCWithAndela/gif.gif'), 'gif.gif')
                .field('gifTitle', '')
                .field('gifAuthorId', 1)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                })
            done();
        })

        // error on wrong token
        it('should give an error on wrong token', (done) => {
            chai.request(app)
                .post('/api/v1/gifs')
                .set('Authorization', `bearer wrong token`)
                .attach('gif', fs.readFileSync('c:/Users/DAMILOLA/Desktop/DevCWithAndela/gif.gif'), 'gif.gif')
                .field('gifTitle', 'my gif')
                .field('gifAuthorId', 1)
                .end((err, res) => {
                    res.should.have.status(403);
                    res.body.should.be.a('object');
                })
            done();
        })

        // test gif upload
        it('should post a gif', (done) => {
            chai.request(app)
                .post('/api/v1/gifs')
                .set('Authorization', `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vaGFtbWVkIiwicGFzc3dvcmQiOiJpYnJhaGltIiwiaWF0IjoxNTcyODc1ODk2LCJleHAiOjE1NzI5NjIyOTZ9.Xd1C7c4T4DrQY5hZV0-J7dNmH1ioqwuH-956yDLMLlE`)
                .attach('gif', fs.readFileSync('c:/Users/DAMILOLA/Desktop/DevCWithAndela/gif.gif'), 'gif.gif')
                .field('gifTitle', 'my gif')
                .field('gifAuthorId', 1)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                })
            done();
        })
    })


    // test DELETE
    describe('delete gif', () => {
        const id = 2;

        // error on wrong token
        it('should give an error on wrong token', (done) => {
            chai.request(app)
                .delete(`/api/v1/gifs/${id}`)
                .set('Authorization', `bearer wrong token`)
                .end((err, res) => {
                    res.should.have.status(403);
                    res.body.should.be.a('object');
                })
            done();
        });

        // delete
        it('should delete a selected gif', (done) => {
            chai.request(app)
                .delete(`/api/v1/gifs/${id}`)
                .set('Authorization', `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vaGFtbWVkIiwicGFzc3dvcmQiOiJpYnJhaGltIiwiaWF0IjoxNTcyODc1ODk2LCJleHAiOjE1NzI5NjIyOTZ9.Xd1C7c4T4DrQY5hZV0-J7dNmH1ioqwuH-956yDLMLlE`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                })
            done();
        })
    })
})