const request = require('supertest');
const app = require('../app');


describe("question.getAll function", () => {
  test.skip("it should response the GET method", done => {
    request(app).get('/question').then(response => {
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

describe("question.create function", () => {
  test.skip("it should response the POST method", done => {
    request(app).post('/question').send({question: "Apakah kamu suka makan?", value: 1}).then(response => {
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty("jsonapi");
      expect(response.body).toHaveProperty("meta");
      expect(response.body).toHaveProperty("status");
      expect(response.body).toHaveProperty("message");
      expect(response.body).toHaveProperty("data");
      expect(response.body.jsonapi).toHaveProperty("version");
      expect(response.body.meta).toHaveProperty("author");
      expect(response.body.meta).toHaveProperty("copyright");
      expect(response.body.data).toHaveProperty("question");
      expect(response.body.jsonapi.version).toBe("1.0");
      expect(response.body.meta.author).toBe("Muhammad Umar Mansyur");
      expect(response.body.meta.copyright).toBe("2022 ~ BE JavaScript Binar Academy");
      expect(response.body.status).toBe(201);
      expect(response.body.message).toBe("Data berhasil ditambahkan");
      expect(response.body.data.question).toBe("Apakah kamu suka makan?");
      done();
    });
  });
});

describe("question.update function", () => {
  test.skip("it should response the PUT method", done => {
    request(app).put('/question/3').send({question: "Apakah kamu suka makan?", value: 20}).then(response => {
      console.log(response.statusCode);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("jsonapi");
      expect(response.body).toHaveProperty("meta");
      expect(response.body).toHaveProperty("status");
      expect(response.body).toHaveProperty("message");
      expect(response.body.jsonapi).toHaveProperty("version");
      expect(response.body.meta).toHaveProperty("author");
      expect(response.body.meta).toHaveProperty("copyright");
      expect(response.body.jsonapi.version).toBe("1.0");
      expect(response.body.meta.author).toBe("Muhammad Umar Mansyur");
      expect(response.body.meta.copyright).toBe("2022 ~ BE JavaScript Binar Academy");
      expect(response.body.status).toBe(200);
      expect(response.body.message).toBe("Data berhasil diubah");
      done();
    });
  });
});

describe("question.delete function", () => {
  test.skip("it should response the DELETE method", done => {
    request(app).delete('/question/3').then(response => {
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("jsonapi");
      expect(response.body).toHaveProperty("meta");
      expect(response.body).toHaveProperty("status");
      expect(response.body).toHaveProperty("message");
      expect(response.body.jsonapi).toHaveProperty("version");
      expect(response.body.meta).toHaveProperty("author");
      expect(response.body.meta).toHaveProperty("copyright");
      expect(response.body.jsonapi.version).toBe("1.0");
      expect(response.body.meta.author).toBe("Muhammad Umar Mansyur");
      expect(response.body.meta.copyright).toBe("2022 ~ BE JavaScript Binar Academy");
      expect(response.body.status).toBe(200);
      expect(response.body.message).toBe("Data berhasil dihapus");
      done();
    });
  });
});

