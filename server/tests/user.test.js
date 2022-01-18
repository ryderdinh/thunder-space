const app = require("../src/app");
const request = require("supertest");

jest.useFakeTimers()
describe('First test', function () {
   it('response token', function (done) {
       request(app)
           .post('/api/token')
           .send({
              email : "boypham1234567@gmail.com",
              password : "123456"
            })
            .set('Accept', 'application/json')
           .expect(200, done);
   });
});
