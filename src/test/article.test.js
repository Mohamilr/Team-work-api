import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../server';

// token
// import token from './register.test';

chai.use(chaiHttp);
chai.should();

describe.skip('articles', () => {
    describe('create article', () => {
        // error om wrong token
        it('should give error on wrong token', (done) => {
            chai.request(app)
                .post('/api/v1/articles')
                .set('Authorization', `bearer wrong token`)
                .send({
                    title: 'my first official project',
                    article: 'i was an intern at Hotels.ng. i worked with different teams and was assigned to different projects. it was a great experience to be a part of HNG internship 6.'
                })
                .end((err, res) => {
                    res.should.have.status(403);
                    res.body.should.be.a('object');
                })
            done();
        })


        // error on empty body values
        it('should give error on empty body values', (done) => {
            chai.request(app)
                .post('/api/v1/articles')
                .set('Authorization', `bearer ${process.env.TEST_TOKEN}`)
                .send({
                    title: 'my first official project',
                    article: ''
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                })
            done();
        })


        it('should create a new article', (done) => {
            chai.request(app)
                .post('/api/v1/articles')
                .set('Authorization', `bearer ${process.env.TEST_TOKEN}`)
                .send({
                    title: 'my first official project',
                    article: 'i was an intern at Hotels.ng. i worked with different teams and was assigned to different projects. it was a great experience to be a part of HNG internship 6.'
                })
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                })
            done();
        })

    })



    // test modify route
    describe('PATCH modify article', () => {
        // give error on wrong token
        const id = 2;
        it('should give an error on wrong token', (done) => {
            chai.request(app)
                .patch(`/api/v1/articles/${id}`)
                .set('Authorization', `bearer wrong token`)
                .send({
                    title: 'vacation',
                    article: 'i was an intern at Hotels.ng. i worked with different teams and was assigned to different projects. it was a great experience to be a part of HNG internship 6.'
                })
                .end((err, res) => {
                    res.should.have.status(403);
                    res.body.should.be.a('object');
                })
            done();
        })

        // modify an article
        it('should modify an article', (done) => {
            chai.request(app)
                .patch(`/api/v1/articles/${id}`)
                .set('Authorization', `bearer ${process.env.TEST_TOKEN}`)
                .send({
                    title: 'vacation',
                    article: 'i was an intern at Hotels.ng. i worked with different teams and was assigned to different projects. it was a great experience to be a part of HNG internship 6.'
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                })
            done();
        })
    })


    // test delete route
    describe('delete article', () => {
        // error on wrong token
        const id = 2;
        it('should delete an article', (done) => {
            chai.request(app)
                .delete(`/api/v1/articles/${id}`)
                .set('Authorization', `bearer wrong token`)
                .end((err, res) => {
                    res.should.have.status(403);
                    res.body.should.be.a('object');
                })
            done();
        })

        // delete an article
        it('should delete an article', (done) => {
            chai.request(app)
                .delete(`/api/v1/articles/${id}`)
                .set('Authorization', `bearer ${process.env.TEST_TOKEN}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                })
            done();
        })
    })

})