import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../server';

// token
import logInToken from './register.test';

chai.use(chaiHttp);
chai.should();

describe.skip('articles', () => {
    describe('POST create article', () => {
        it('should create a new article', (done) => {
            chai.request(app)
            .post('/api/v1/articles')
            .set( 'Authorization', `bearer ${logInToken}` )
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