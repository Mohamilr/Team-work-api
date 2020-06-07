import supertest from 'supertest';

import app from '../server';

const request = supertest.agent(app);

describe('POST comment', () => {
  let token;

  // register new user
  it('should log in an existing user', (done) => {
    request
      .post('/api/v1/auth/signin')
      .send({
        email: 'mohammed@gmail.com',
        password: 'administrator',
      })
      .then(async (res) => {
        token = res.body.data.token;
        await expect(res.status).toEqual(201);
        // expect(res.body).toEqual('object');
        done();
      });
  });

  // test article comment
  describe('POST article comment', () => {
    const id = 1;

    // error on empty body values
    it('should give an error on empty body values', (done) => {
      request
        .post(`/api/v1/articles/${id}/comment`)
        .set('Authorization', `bearer ${token}`)
        .send({
          comment: '',
        })
        .then((res) => {
          expect(res.status).toEqual(400);
          // expect(res.body).toEqual('object');
          done();
        });
    });

    // error on wrong token
    it('should give an error on wrong token', (done) => {
      request
        .post(`/api/v1/articles/${id}/comment`)
        .set('Authorization', `bearer wrong token`)
        .send({
          comment: 'nice article.',
          authorId: 1,
        })
        .then((res) => {
          expect(res.status).toEqual(403);
          // expect(res.body).toEqual('object');
          done();
        });
    });

    // post a comment
    it('should post an article comment', (done) => {
      request
        .post(`/api/v1/articles/${id}/comment`)
        .set('Authorization', `bearer ${token}`)
        .send({
          comment: 'nice article.',
          authorId: 1,
        })
        .then((res) => {
          expect(res.status).toEqual(201);
          // expect(res.body).toEqual('object');
          done();
        });
    });
  });

  // test gif comment
  describe('POST gif comment', () => {
    const id = 1;

    // error on empty body values
    it('should give an error on empty body values', (done) => {
      request
        .post(`/api/v1/gifs/${id}/comment`)
        .set('Authorization', `bearer ${token}`)
        .send({
          comment: '',
          authorId: 1,
        })
        .then((res) => {
          expect(res.status).toEqual(400);
          // expect(res.body).toEqual('object');
          done();
        });
    });

    // error on wromg token
    it('should give an error on wrong token', (done) => {
      request
        .post(`/api/v1/gifs/${id}/comment`)
        .set('Authorization', `bearer wrong token`)
        .send({
          comment: 'what a funny gif.',
          authorId: 1,
        })
        .then((res) => {
          expect(res.status).toEqual(403);
          // expect(res.body).toEqual('object');
          done();
        });
    });

    // post gif comment
    it('should post a gif comment', (done) => {
      request
        .post(`/api/v1/gifs/${id}/comment`)
        .set('Authorization', `bearer ${token}`)
        .send({
          comment: 'what a funny gif.',
          authorId: 1,
        })
        .then((res) => {
          expect(res.status).toEqual(201);
          // expect(res.body).toEqual('object');
          done();
        });
    });
  });
});
