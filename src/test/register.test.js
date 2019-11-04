import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../server';

chai.use(chaiHttp);
chai.should();

// let signUpToken = null;
let token = 'token';

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
                    res.should.have.status(400)
                })
            done();
        })
    })


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
    describe.skip('POST sign up', () => {
        it('should sign up a user', (done) => {
            chai.request(app)
                .post('/api/v1/auth/create-user')
                .send({
                    firstName: 'mohammed',
                    lastName: 'ibrahim',
                    email: 'new',
                    password: 'admin',
                    gender: 'male',
                    jobRole: 'assistant',
                    department: 'engineer',
                    address: '4, alomosho'
                })
                .end((err, res) => {
                    res.should.have.status(201)
                    // signUpToken = res.body.data.token;
                })
            done();
        })
    })

    //
    // test log in
    // error if fields are empty
    describe('POST sign up', () => {
        it('should give error if fields are empty', (done) => {
            chai.request(app)
                .post('/api/v1/auth/create-user')
                .send({
                    email: 'new usermkmkm',
                    password: ''
                })
                .end((err, res) => {
                    res.should.have.status(400)
                })
            done();
        })
    })

    // error if user does not exist
    describe('POST login', () => {
        it('should give error if user does not exist', (done) => {
            chai.request(app)
            .post('/api/v1/auth/signin')
            .send({
                email: 'non existing user',
                password: 'password'
            })
            .end((err, res) => {
                res.should.have.status(400)
            })
            done();
        })
    })

    // login a user
    describe('POST login', () => {
        it('should log in an existing user', (done) => {
            chai.request(app)
            .post('/api/v1/auth/signin')
            .send({
                email: 'mohammed',
                password: 'ibrahim'
            })
            .end((err, res) => {
                res.should.have.status(201)
                token = res.body.data.token
                console.log(token)
            })
            done();
        })
    })


    // error for incorrect email or password
    describe('POST login', () => {
        it('should give error for incorrect email or password', (done) => {
            chai.request(app)
            .post('/api/v1/auth/signin')
            .send({
                email: 'new',
                password: 'bypass'
            })
            .end((err, res) => {
                res.should.have.status(403)
            })
            done();
        })
    })
})

export default token;