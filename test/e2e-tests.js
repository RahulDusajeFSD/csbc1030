const chai = require('chai');
const expect = chai.expect;
const supertest = require('supertest');
const app = require('../src/server'); // Assuming your server file is named server.js

describe('End-to-End Tests', () => {
  it('retrieve entity', async () => {
    const response = await supertest(app).get('/users/1').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoidGVzdCIsImlhdCI6MTcwMjc0ODY1N30.9-whTvdDSRYUI8Eslt8JUsVEdFseX3JOOLJqPs5p1do');
    expect(response.status).to.equal(200);
    
  });

  it('return appropriate error code', async () => {
    const response = await supertest(app).get('/users/2').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoidGVzdCIsImlhdCI6MTcwMjc0ODY1N30.9-whTvdDSRYUI8Eslt8JUsVEdFseX3JOOLJqPs5p1do');
    expect(response.status).to.equal(403);
  });

  it('return appropriate error code', async () => {
    const response = await supertest(app).get('/users/1');
    expect(response.status).to.equal(401);
  });
});
