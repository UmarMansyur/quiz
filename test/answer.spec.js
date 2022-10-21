const request = require('supertest');
const app = require('../app.js');

//haduh
describe("answer.function", () => {
  test("it should response the GET method", done => {
    request(app).get('/answer').then(response => {
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("jsonapi");
      expect(response.body).toHaveProperty("meta");
      expect(response.body).toHaveProperty("status");
      expect(response.body).toHaveProperty("message");
      expect(response.body).toHaveProperty("data");
      expect(response.body.jsonapi).toHaveProperty("version");
      expect(response.body.meta).toHaveProperty("author");
      expect(response.body.meta).toHaveProperty("copyright");
      expect(response.body.jsonapi.version).toBe("1.0");
      expect(response.body.meta.author).toBe("Muhammad Umar Mansyur");
      expect(response.body.meta.copyright).toBe("2022 ~ BE JavaScript Binar Academy");
      expect(response.body.status).toBe(200);
      expect(response.body.message).toBe("Data berhasil ditampilkan");
      done();
    });
  });
});