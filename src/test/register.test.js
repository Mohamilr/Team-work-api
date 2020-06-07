import supertest from 'supertest';

import app from '../server';

const request = supertest.agent(app);

describe('POST register', () => {
  // before( async () => {
  //     await pool.query('')
  // })
  // error if fields are empty
  describe('POST sign up', () => {
    it('should give error if fields are empty', (done) => {
      request
        .post('/api/v1/auth/create-user')
        .send({
          firstName: '',
          lastName: '',
          email: 'newuser@gmail.com',
          password: 'administrator',
          gender: 'male',
          jobRole: 'assistant',
          department: '',
          address: '4, alomosho',
        })
        .then((res) => {
          expect(res.status).toEqual(400);
          //   expect(res.body).toEqual('object');
          done();
        });
    });

    // error if a user already exists
    // it('should give error is a user already exists', (done) => {
    //   request.post('/api/v1/auth/create-user')
    //     .send({
    //       firstName: 'mohammed',
    //       lastName: 'ibrahim',
    //       email: 'ibrahimdamilola@gmail.com',
    //       password: '123456789',
    //       gender: 'male',
    //       jobRole: 'assistant',
    //       department: 'engineer',
    //       address: '4, alimosho',
    //     })
    //     .then((res) => {
    //       expect(res.status).toEqual(400);
    //       // expect(res.body).toEqual('object');
    //       done();
    //     });
    // });

    // register new user
    it('should sign up a user', (done) => {
      request
        .post('/api/v1/auth/create-user')
        .send({
          firstName: 'mohammed',
          lastName: 'ibrahim',
          email: 'mohammed@gmail.com',
          password: 'administrator',
          gender: 'male',
          jobRole: 'assistant',
          department: 'engineer',
          address: '4, alomosho',
        })
        .then((res) => {
          expect(res.status).toEqual(201);
          // expect(res.body).toEqual('object');
          done();
        });
    });

    //  Register admin
    it('should sign up admin user', (done) => {
      request
        .post('/api/v1/auth/create-user')
        .send({
          firstName: 'mohammed',
          lastName: 'ibrahim',
          email: process.env.ADMIN_EMAIL,
          password: process.env.ADMIN_PASSWORD,
          gender: 'male',
          jobRole: 'assistant',
          department: 'engineer',
          address: '4, alomosho',
        })
        .then((res) => {
          expect(res.status).toEqual(201);
          // expect(res.body).toEqual('object');
          done();
        });
    });
  });

  // test log in
  // error if fields are empty
  describe('POST login', () => {
    it('should give error if fields are empty', (done) => {
      request
        .post('/api/v1/auth/signin')
        .send({
          email: 'ibrahimdamilola@gmail.com',
          password: '',
        })
        .then((res) => {
          expect(res.status).toEqual(400);
          // expect(res.body).toEqual('object');
          done();
        });
    });

    // error if user does not exist
    it('should give error if user does not exist', (done) => {
      request
        .post('/api/v1/auth/signin')
        .send({
          email: 'nonexistinguser@gmail.com',
          password: 'password',
        })
        .then((res) => {
          expect(res.status).toEqual(400);
          expect(res.body).toEqual({
            data: 'email does not exist, please sign up',
            status: 'error',
          });
          done();
        });
    });

    // // login a user
    it('should log in an existing user', (done) => {
      request
        .post('/api/v1/auth/signin')
        .send({
          email: 'mohammed@gmail.com',
          password: 'administrator',
        })
        .then((res) => {
          expect(res.status).toEqual(201);
          // expect(res.body).toEqual('object');
          done();
        });
    });

    // // login admin
    it('should log in an existing user', (done) => {
      request
        .post('/api/v1/auth/signin')
        .send({
          email: process.env.ADMIN_EMAIL,
          password: process.env.ADMIN_PASSWORD,
        })
        .then((res) => {
          expect(res.status).toEqual(201);
          // expect(res.body).toEqual('object');
          done();
        });
    });

    // error for incorrect email or password
    // it('should give error for incorrect email or password', (done) => {
    //     chai.request(app)
    //         .post('/api/v1/auth/signin')
    //         .send({
    //             email: 'ibrahimdamilola@gmail.com',
    //             password: 'administer',
    //         })
    //         .end((err, res) => {
    //             console.log(res)
    //             res.should.have.status(403);
    //             res.body.should.be.a('object');
    //         })
    //     done();
    // });
  });
});
