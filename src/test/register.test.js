import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../server';

chai.use(chaiHttp);
chai.should();

// let signUpToken = null;
// let token = '';

describe('POST register', () => {
    // error if fields are empty
    describe('POST sign up', () => {
        it('should give error if fields are empty', (done) => {
            chai.request(app)
                .post('/api/v1/auth/create-user')
                .send({
                    firstName: '',
                    lastName: '',
                    email: 'new usermkmkm',
                    password: 'admin',
                    gender: 'male',
                    jobRole: 'assistant',
                    department: '',
                    address: '4, alomosho'
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                })
            done();
        })


        // error if a user already exists
        it('should give error is a user already exists', (done) => {
            chai.request(app)
                .post('/api/v1/auth/create-user')
                .send({
                    firstName: 'mama',
                    lastName: 'omo',
                    email: 'mohammed',
                    password: 'ibrahim',
                    gender: 'male',
                    jobRole: 'assistant',
                    department: 'engineer',
                    address: '4, alomosho'
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                })
            done();
        })


        // register new user
        it('should sign up a user', (done) => {
            chai.request(app)
                .post('/api/v1/auth/create-user')
                .send({
                    firstName: 'mohammed',
                    lastName: 'ibrahim',
                    email: 'damilola',
                    password: 'admin',
                    gender: 'male',
                    jobRole: 'assistant',
                    department: 'engineer',
                    address: '4, alomosho'
                })
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                })
            done();
        })
    })


    // test log in
    // error if fields are empty
    describe('POST login', () => {
        it('should give error if fields are empty', (done) => {
            chai.request(app)
                .post('/api/v1/auth/signin')
                .send({
                    email: 'new usermkmkm',
                    password: ''
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                })
            done();
        })


        // error if user does not exist
        it('should give error if user does not exist', (done) => {
            chai.request(app)
                .post('/api/v1/auth/signin')
                .send({
                    email: 'non existing user',
                    password: 'password'
                })
                .end((err, res) => {
                    res.should.have.status(400)
                    res.body.should.be.a('object');
                })
            done();
        })


        // login a user
        it('should log in an existing user', (done) => {
            chai.request(app)
                .post('/api/v1/auth/signin')
                .send({
                    email: 'mohammed',
                    password: 'ibrahim'
                })
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    // token = res.body.data.token
                })
            done();
        })


        // error for incorrect email or password
        it('should give error for incorrect email or password', (done) => {
            chai.request(app)
                .post('/api/v1/auth/signin')
                .send({
                    email: 'new',
                    password: 'bypass'
                })
                .end((err, res) => {
                    res.should.have.status(403);
                    res.body.should.be.a('object');
                })
            done();
        })
    })
})

// export default token;