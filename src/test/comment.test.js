import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../server';

import token from './register.test';

chai.use(chaiHttp);
chai.should();

describe('POST comment', () => {
    describe('post article comment', () => {
        const id = 2;

        // error on empty body values
        it('should give an error on empty body values', (done) => {
            chai.request(app)
                .post(`api/v1/articles/${id}/comment`)
                .set('Authorization', `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vaGFtbWVkIiwicGFzc3dvcmQiOiJpYnJhaGltIiwiaWF0IjoxNTcyNzUyNjE1LCJleHAiOjE1NzI4MzkwMTV9.aNUBP0nNhk5etK-Fb98UzDQOZH1sPIrnbFsAEsRiAVo`)
                .send({
                    comment: '',
                    authorId: 1
                })
                .end((err, res) => {
                    res.should.have.status(400)
                    res.body.should.be.a('object')
                })
            done();
        })

        // error on wrong token
        it('should give an error on wrong token', (done) => {
            chai.request(app)
                .post(`api/v1/articles/${id}/comment`)
                .set('Authorization', `bearer wrong token`)
                .send({
                    comment: 'nice article.',
                    authorId: 1
                })
                .end((err, res) => {
                    res.should.have.status(403)
                    res.body.should.be.a('object')
                })
            done();
        })

        // post a comment
        it('should post an article comment', (done) => {
            chai.request(app)
                .post(`api/v1/articles/${id}/comment`)
                .set('Authorization', `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vaGFtbWVkIiwicGFzc3dvcmQiOiJpYnJhaGltIiwiaWF0IjoxNTcyNzUyNjE1LCJleHAiOjE1NzI4MzkwMTV9.aNUBP0nNhk5etK-Fb98UzDQOZH1sPIrnbFsAEsRiAVo`)
                .send({
                    comment: 'nice article.',
                    authorId: 1
                })
                .end((err, res) => {
                    res.should.have.status(201)
                    res.body.should.be.a('object')
                })
            done();
        })
    })
})