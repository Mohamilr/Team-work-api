import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../server';

chai.use(chaiHttp);
chai.should();

describe('GET', () => {
    describe('GET feed', () => {
        // error on wrong token
        it('should give an error on wrong token', (done) => {
            chai.request(app)
            .get('/api/v1/feed')
            .set('Authorization', `bearer wrong token`)
            .end((err, res) => {
                res.should.have.status(403);
                res.body.should.be.a('object');
            })
            done();
        })

        // no feed available
        // it('should give an error if there are no feeds', (done) => {
        //     chai.request(app)
        //     .get('/api/v1/feed')
        //     .set('Authorization', `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vaGFtbWVkIiwicGFzc3dvcmQiOiJpYnJhaGltIiwiaWF0IjoxNTcyODc1ODk2LCJleHAiOjE1NzI5NjIyOTZ9.Xd1C7c4T4DrQY5hZV0-J7dNmH1ioqwuH-956yDLMLlE`)
        //     .end((err, res) => {
        //         res.should.have.status(400);
        //         res.body.should.be.a('object');
        //     })
        //     done();
        // })


        // get all feeds
        it('should get all articles and gif', (done) => {
            chai.request(app)
            .get('/api/v1/feed')
            .set('Authorization', `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vaGFtbWVkIiwicGFzc3dvcmQiOiJpYnJhaGltIiwiaWF0IjoxNTcyODc1ODk2LCJleHAiOjE1NzI5NjIyOTZ9.Xd1C7c4T4DrQY5hZV0-J7dNmH1ioqwuH-956yDLMLlE`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
            })
            done();
        })
    })


    // test get single article
    describe('GET single article', () => {
        const id = 9;
        // error on wrong token
        it('should give an error on wrong token', (done) => {
            chai.request(app)
            .get(`/api/v1/articles/${id}`)
            .set('Authorization', `bearer wrong token`)
            .end((err, res) => {
                res.should.have.status(403);
                res.body.should.be.a('object');
            })
            done();
        })


        // get a single article
        it('should get a single article', (done) => {
            chai.request(app)
            .get(`/api/v1/articles/${id}`)
            .set('Authorization', `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vaGFtbWVkIiwicGFzc3dvcmQiOiJpYnJhaGltIiwiaWF0IjoxNTcyODY5MjQwLCJleHAiOjE1NzI5NTU2NDB9.baWcD6MoX8NAKvdTLt46gz6y4U6rOTTi8OgU64cIEI0`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
            })
            done();
        })
    })


    // test get single gif
    describe('GET single gif', () => {
        const id = 2;
        // error on wrong token
        it('should give an error on wrong token', (done) => {
            chai.request(app)
            .get(`/api/v1/gifs/${id}`)
            .set('Authorization', `bearer wrong token`)
            .end((err, res) => {
                res.should.have.status(403);
                res.body.should.be.a('object');
            })
            done();
        })

        // get a single gif
        it('should give an error on wrong token', (done) => {
            chai.request(app)
            .get(`/api/v1/gifs/${id}`)
            .set('Authorization', `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vaGFtbWVkIiwicGFzc3dvcmQiOiJpYnJhaGltIiwiaWF0IjoxNTcyODY5MjQwLCJleHAiOjE1NzI5NTU2NDB9.baWcD6MoX8NAKvdTLt46gz6y4U6rOTTi8OgU64cIEI0`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
            })
            done();
        })
    })
})