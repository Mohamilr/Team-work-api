import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../server';

// token
import token from './register.test';

chai.use(chaiHttp);
chai.should();

describe('articles', () => {
    describe('create article', () => {
        // error om wrong token
        describe('POST create article', () => {
            it('should give error on wrong token', (done) => {
                chai.request(app)
                    .post('/api/v1/articles')
                    .set('Authorization', `bearer wrong token`)
                    .send({
                        title: 'my first official project',
                        article: 'i was an intern at Hotels.ng.',
                        authorId: 1
                    })
                    .end((err, res) => {
                        res.should.have.status(403)
                    })
                done();
            })
        })

        // error on empty body values
        describe('POST create article', () => {
            it('should give error on empty body values', (done) => {
                chai.request(app)
                    .post('/api/v1/articles')
                    .set('Authorization', `bearer wrong token`)
                    .send({
                        title: 'my first official project',
                        article: '',
                        authorId: 1
                    })
                    .end((err, res) => {
                        res.should.have.status(400)
                    })
                done();
            })
        })

        describe('POST create article', () => {
            it('should create a new article', (done) => {
                chai.request(app)
                    .post('/api/v1/articles')
                    .set('Authorization', `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vaGFtbWVkIiwicGFzc3dvcmQiOiJpYnJhaGltIiwiaWF0IjoxNTcyNzUyNjE1LCJleHAiOjE1NzI4MzkwMTV9.aNUBP0nNhk5etK-Fb98UzDQOZH1sPIrnbFsAEsRiAVo`)
                    .send({
                        title: 'my first official project',
                        article: 'i was an intern at Hotels.ng.',
                        authorId: 1
                    })
                    .end((err, res) => {
                        res.should.have.status(201)
                    })
                done();
            })
        })
    })

    // test modify route
    describe('modify article', () => {
        // give error on wrong token
        describe('PATCH modify article', () => {
            const id = 3;
            it('should give an error on wrong token', (done) => {
                chai.request(app)
                    .patch(`/api/v1/articles/${id}`)
                    .set('Authorization', `bearer wrong token`)
                    .send({
                        title: 'vacation',
                        article: 'i travlled to my home town during the school holiday'
                    })
                    .end((err, res) => {
                        res.should.have.status(403)
                    })
                    done();
            })
        })

        // modify an article
        describe('PATCH modify article', () => {
            const id = 3;
            it('should modify an article', (done) => {
                chai.request(app)
                    .patch(`/api/v1/articles/${id}`)
                    .set('Authorization', `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vaGFtbWVkIiwicGFzc3dvcmQiOiJpYnJhaGltIiwiaWF0IjoxNTcyNzUyNjE1LCJleHAiOjE1NzI4MzkwMTV9.aNUBP0nNhk5etK-Fb98UzDQOZH1sPIrnbFsAEsRiAVo`)
                    .send({
                        title: 'vacation',
                        article: 'i travlled to my home town during the school holiday'
                    })
                    .end((err, res) => {
                        res.should.have.status(200)
                    })
                    done();
            })
        })
    })

})