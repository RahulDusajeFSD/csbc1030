const chai = require('chai');
const expect = chai.expect;
const supertest = require('supertest');
const app = require('../src/server'); 

describe('Unit Tests', () => {
  it('retrieve JWT Token for the request made by user 1', async () => {
    const response = await supertest(app).get('/users/1').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoidGVzdCIsImlhdCI6MTcwMjc0ODY1N30.9-whTvdDSRYUI8Eslt8JUsVEdFseX3JOOLJqPs5p1do');
    expect(response.status).to.equal(200);
  });

  it('Failure as the user 2 is trying to access with JWT Token of user 1', async () => {
    const response = await supertest(app).get('/users/2').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoidGVzdCIsImlhdCI6MTcwMjc0ODY1N30.9-whTvdDSRYUI8Eslt8JUsVEdFseX3JOOLJqPs5p1do');
    expect(response.status).to.equal(403);
  });

  it('should not be able to retrieve an entity if not authenticated and return appropriate error code', async () => {
    const response = await supertest(app).get('/users/1');
    expect(response.status).to.equal(401);
  });
});
