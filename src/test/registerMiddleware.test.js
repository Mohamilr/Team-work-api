import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../server';

chai.use(chaiHttp);
chai.should();

describe('POST sign up', () => {
        it('should give error on incorrect email format', (done) => {
            chai.request(app)
                .post('/api/v1/auth/create-user')
                .send({
                    firstName: 'mohammed',
                    lastName: 'ibrahim',
                    email: 'useremail',
                    password: 'administrator',
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
        });

        it('should give error if password length is less than 6', (done) => {
            chai.request(app)
                .post('/api/v1/auth/create-user')
                .send({
                    firstName: 'mohammed',
                    lastName: 'ibrahim',
                    email: 'user@email.com',
                    password: 'admin',
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
        });

        it('should give error if gender length is less than 3', (done) => {
            chai.request(app)
                .post('/api/v1/auth/create-user')
                .send({
                    firstName: 'mohammed',
                    lastName: 'ibrahim',
                    email: 'user@email.com',
                    password: 'admin',
                    gender: 'mal',
                    jobRole: 'assistant',
                    department: 'engineer',
                    address: '4, alomosho'
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                })
            done();
        });

        it('should give error if department length is less than 3', (done) => {
            chai.request(app)
                .post('/api/v1/auth/create-user')
                .send({
                    firstName: 'mohammed',
                    lastName: 'ibrahim',
                    email: 'user@email.com',
                    password: 'admin',
                    gender: 'male',
                    jobRole: 'assistant',
                    department: 'en',
                    address: '4, alomosho'
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                })
            done();
        });

        it('should give error if address length is less than 3', (done) => {
            chai.request(app)
                .post('/api/v1/auth/create-user')
                .send({
                    firstName: 'mohammed',
                    lastName: 'ibrahim',
                    email: 'user@email.com',
                    password: 'admin',
                    gender: 'male',
                    jobRole: 'assistant',
                    department: 'en',
                    address: '4,'
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                })
            done();
        });
    })
