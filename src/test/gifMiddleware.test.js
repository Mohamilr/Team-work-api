// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import path from 'path';

// import app from '../server';

// chai.use(chaiHttp);
// chai.should();

// describe.skip('create gif', () => {
//   //
//   it('should give error if image is not .gif', (done) => {
//     chai
//       .request(app)
//       .post('/api/v1/gifs')
//       .set('Authorization', `bearer ${process.env.TEST_TOKEN}`)
//       .attach(
//         'gif',
//         path.join(__dirname, './test-images/image.jpg'),
//         'image.jpg'
//       )
//       .field('gifTitle', 'my funny gif')
//       .end((err, res) => {
//         res.should.have.status(400);
//         res.body.should.be.a('object');
//       });
//     done();
//   });
// });
