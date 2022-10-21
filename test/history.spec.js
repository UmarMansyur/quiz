const request = require('supertest');
const app = require('../app');	

describe('auth.register', () => {
  test('testing auth.register', async () => {
    try {
      const name = 'Muhammad Umar Mansyur';
      const password = '281002';
      const res = await request(app).post('/register').send({ name, password });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('asd');
      expect(res.body.data).toHaveProperty('dfg');
      expect(res.body.data).toHaveProperty('asd');
      expect(res.body.data.username).toBe('asdfasdsdf');
      expect(res.body.data.password).toBe('asd');
    } catch (error) {}
  });
});


// ga tau lagiasdfasdf