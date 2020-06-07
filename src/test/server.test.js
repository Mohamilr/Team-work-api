import supertest from 'supertest';

import app from '../server';

const request = supertest.agent(app);

describe('SERVER.js', () => {
  // welcome route
  it('should visit welcome route', (done) => {
    request
      .get('/')
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty('status', 'success');
        expect(res.status).toEqual(200);
        done();
      });
  });
});
