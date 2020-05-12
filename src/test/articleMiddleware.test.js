import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../server';

chai.use(chaiHttp);
chai.should();

describe.skip('articleMiddleware', () => {
    describe('POST and PATCH', () => {
        const id = 1;
        // post
        it('should give an error if title length is less than 5 characters', (done) => {
            chai.request(app)
            .post('/api/v1/articles')
            .set('Authorization', `bearer ${process.env.TEST_TOKEN}`)
            .send({
                title: 'a ',
                article: 'i was an intern at Hotels.ng. i worked with different teams and was assigned to different projects. it was a great experience to be a part of HNG internship 6.'
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
            })
            done();
        })

        // 
        it('should give an error if article length is less than 20 characters', (done) => {
            chai.request(app)
            .post('/api/v1/articles')
            .set('Authorization', `bearer ${process.env.TEST_TOKEN}`)
            .send({
                title: 'my first article',
                article: 'i was an intern'
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
            })
            done();
        })

        // patch
        it('should give an error if title length is less than 5 characters', (done) => {
            chai.request(app)
            .patch(`/api/v1/articles/${id}`)
            .set('Authorization', `bearer ${process.env.TEST_TOKEN}`)
            .send({
                title: 'a ',
                article: 'i was an intern at Hotels.ng. i worked with different teams and was assigned to different projects. it was a great experience to be a part of HNG internship 6.'
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
            })
            done();
        })

        // 
        it('should give an error if article length is less than 20 characters', (done) => {
            chai.request(app)
            .patch(`/api/v1/articles/${id}`)
            .set('Authorization', `bearer ${process.env.TEST_TOKEN}`)
            .send({
                title: 'my first article',
                article: 'i was an intern'
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
            })
            done();
        })
    })
})