import supertest from 'supertest';

import app from '../server';

const request = supertest.agent(app);

describe('articles', () => {
  let token;
  // register new user to generate token
  it('should sign up a user', (done) => {
    request
      .post('/api/v1/auth/create-user')
      .send({
        firstName: 'mohammed',
        lastName: 'ibrahim',
        email: 'mohammedi@gmail.com',
        password: 'administrator',
        gender: 'male',
        jobRole: 'assistant',
        department: 'engineer',
        address: '4, alomosho',
      })
      .then(async (res) => {
        token = res.body.data.token;
        await expect(res.status).toEqual(201);
        // expect(res.body).toEqual('object');
        done();
      });
  });

  describe('create article', () => {
    // error om wrong token
    it('should give error on wrong token', (done) => {
      request
        .post('/api/v1/articles')
        .set('Authorization', `bearer wrong token`)
        .send({
          title: 'my first official project',
          article:
            'i was an intern at Hotels.ng. i worked with different teams and was assigned to different projects. it was a great experience to be a part of HNG internship 6.',
        })
        .then((res) => {
          expect(res.status).toEqual(403);
          // expect(res.body).toEqual('object');
          done();
        });
    });

    // error on empty body values
    it('should give error on empty body values', (done) => {
      request
        .post('/api/v1/articles')
        .set('Authorization', `bearer ${token}`)
        .send({
          title: 'my first official project',
          article: '',
        })
        .then(async (res) => {
          await expect(res.status).toEqual(400);
          // expect(res.body).toEqual('object');
          done();
        });
    });

    it('should create a new article', (done) => {
      request
        .post('/api/v1/articles')
        .set('Authorization', `bearer ${token}`)
        .send({
          title: 'my first official project',
          article:
            'i was an intern at Hotels.ng. i worked with different teams and was assigned to different projects. it was a great experience to be a part of HNG internship 6.',
        })
        .then((res) => {
          expect(res.status).toEqual(201);
          // expect(res.body).toEqual('object');
          done();
        });
    });
  });

  // test modify route
  describe('PATCH modify article', () => {
    // give error on wrong token
    const id = 1;
    it('should give an error on wrong token', (done) => {
      request
        .patch(`/api/v1/articles/${id}`)
        .set('Authorization', `bearer wrong token`)
        .send({
          title: 'vacation',
          article:
            'i was an intern at Hotels.ng. i worked with different teams and was assigned to different projects. it was a great experience to be a part of HNG internship 6.',
        })
        .then((res) => {
          expect(res.status).toEqual(403);
          // expect(res.body).toEqual('object');
          done();
        });
    });

    // modify an article
    it('should modify an article', (done) => {
      request
        .patch(`/api/v1/articles/${id}`)
        .set('Authorization', `bearer ${token}`)
        .send({
          title: 'vacation',
          article:
            'i was an intern at Hotels.ng. i worked with different teams and was assigned to different projects. it was a great experience to be a part of HNG internship 6.',
        })
        .then((res) => {
          expect(res.status).toEqual(200);
          // expect(res.body).toEqual('object');
          done();
        });
    });

    // it('should give an error if article does not exist', (done) => {
    //     chai.request(app)
    //         .patch(`/api/v1/articles/${id}`)
    //         .set('Authorization', `bearer ${token}`)
    //         .send({
    //             title: 'vacation',
    //             article: 'i was an intern at Hotels.ng. i worked with different teams and was assigned to different projects. it was a great experience to be a part of HNG internship 6.'
    //         })
    //         .end((err, res) => {
    //             res.should.have.status(403);
    //             res.body.should.be.a('object');
    //             res.body.data.should.equal('You can only edit your article');
    //         })
    //     done();
    // })
  });

  // test delete route
  describe('delete article', () => {
    // error on wrong token
    const id = 1;
    it('should delete an article', (done) => {
      request
        .delete(`/api/v1/articles/${id}`)
        .set('Authorization', `bearer wrong token`)
        .then((res) => {
          expect(res.status).toEqual(403);
          // expect(res.body).toEqual('object');
          done();
        });
    });

    // delete an article
    it('should delete an article', (done) => {
      request
        .delete(`/api/v1/articles/${id}`)
        .set('Authorization', `bearer ${token}`)
        .then((res) => {
          expect(res.status).toEqual(200);
          // expect(res.body).toEqual('object');
          done();
        });
    });

    //     it('should give error if article does not exist', (done) => {
    //         chai.request(app)
    //             .delete(`/api/v1/articles/${id}`)
    //             .set('Authorization', `bearer ${token}`)
    //             .end((err, res) => {
    //                 res.should.have.status(403);
    //                 res.body.should.be.a('object');
    //                 res.body.data.should.equal('You can only delete your article');
    //             })
    //         done();
    //     })
  });

  describe('articleMiddleware', () => {
    const id = 1;
    // post
    it('should give an error if title length is less than 5 characters', (done) => {
      request
        .post('/api/v1/articles')
        .set('Authorization', `bearer ${token}`)
        .send({
          title: 'a ',
          article:
            'i was an intern at Hotels.ng. i worked with different teams and was assigned to different projects. it was a great experience to be a part of HNG internship 6.',
        })
        .then(async (res) => {
          expect(res.status).toEqual(400);
          // expect(res.body).toEqual('object');
          done();
        });
    });

    //
    it('should give an error if article length is less than 20 words', (done) => {
      request
        .post('/api/v1/articles')
        .set('Authorization', `bearer ${token}`)
        .send({
          title: 'my first article',
          article: 'i was an intern',
        })
        .then(async (res) => {
          expect(res.status).toEqual(400);
          // expect(res.body).toEqual('object');
          done();
        });
    });

    // patch
    it('should give an error if title length is less than 5 characters', (done) => {
      request
        .patch(`/api/v1/articles/${id}`)
        .set('Authorization', `bearer ${token}`)
        .send({
          title: 'a ',
          article:
            'i was an intern at Hotels.ng. i worked with different teams and was assigned to different projects. it was a great experience to be a part of HNG internship 6.',
        })
        .then(async (res) => {
          expect(res.status).toEqual(400);
          // expect(res.body).toEqual('object');
          done();
        });
    });

    //
    it('should give an error if article length is less than 20 words', (done) => {
      request
        .patch(`/api/v1/articles/${id}`)
        .set('Authorization', `bearer ${token}`)
        .send({
          title: 'my first article',
          article: 'i was an intern',
        })
        .then(async (res) => {
          expect(res.status).toEqual(400);
          // expect(res.body).toEqual('object');
          done();
        });
    });
  });
});
