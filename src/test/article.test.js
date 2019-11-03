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
                console.log(token)
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
                console.log(token)
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
                console.log(token)
            })
        })
    })
    
})