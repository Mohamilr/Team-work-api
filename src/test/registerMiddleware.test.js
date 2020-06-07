import supertest from 'supertest';

import app from '../server';

const request = supertest.agent(app);

describe.skip('POST sign up', () => {
  it('should give error on incorrect email format', (done) => {
    request.post('/api/v1/auth/create-user').send({
      firstName: 'mohammed',
      lastName: 'ibrahim',
      email: 'useremail',
      password: 'administrator',
      gender: 'male',
      jobRole: 'assistant',
      department: 'engineer',
      address: '4, alomosho',
    });
    // .then(res => {

    // })
    //     .end((err, res) => {
    //         res.should.have.status(400);
    //         res.body.should.be.a('object');
    //     })
    done();
  });

  it('should give error if password length is less than 6', (done) => {
    request
      .post('/api/v1/auth/create-user')
      .send({
        firstName: 'mohammed',
        lastName: 'ibrahim',
        email: 'user@email.com',
        password: 'admin',
        gender: 'male',
        jobRole: 'assistant',
        department: 'engineer',
        address: '4, alomosho',
      })
      .expect(400)
      .end(function (err, res) {
        if (err) throw err;
      });
    // .end((err, res) => {
    //     res.should.have.status(201);
    //     res.body.should.be.a('object');
    // });
    done();
  });
});
