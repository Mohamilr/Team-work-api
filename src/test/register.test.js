import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../server';

chai.use(chaiHttp);
chai.should();

let token = null;

describe('POST register', () => {
    // error if a user already exists
    describe('POST sign up', () => {
        it('should give error is a user already exists', (done) => {
            chai.request(app)
                .post('/api/v1/auth/create-user')
                .send({
                    firstName: 'mama',
                    lastName: 'omo',
                    email: 'new usermkmkm',
                    password: 'admin',
                    gender: 'male',
                    jobRole: 'assistant',
                    department: 'engineer',
                    address: '4, alomosho'
                })
                .end((err, res) => {
                    res.should.have.status(400)
                })
                done();
        })
    })

    // register new user
    describe('POST sign up', () => {
        it('should sign up a user', (done) => {
            chai.request(app)
                .post('/api/v1/auth/create-user')
                .send({
                    firstName: 'mama',
                    lastName: 'omo',
                    email: 'new usermkmk',
                    password: 'admin',
                    gender: 'male',
                    jobRole: 'assistant',
                    department: 'engineer',
                    address: '4, alomosho'
                })
                .end((err, res) => {
                    res.should.have.status(201)
                    token = res.body.data.token;
                })
                done();
        })
    })
})

export default token;