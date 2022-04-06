const supertest = require('supertest');
const { Employee } = require('../../src/api/models');
const app = require('../../src/app');

const employeeSuccess = {
  name: "Alistar Bom",
  email: "muuh@gbox.com.br",
  department: "Back-end",
  salary: "6797.00",
  birth_date: "01-01-1983",
  password: "senhadificil123"
  }

const employeeFail = {
  email: "muuh@gbox.com.br",
  department: 2,
  salary: "6797.00",
  birth_date: "01-01-1983",
  password: "senhadificil123"
  }

describe('GET /employees', () => {
  describe('Lista todos os employees com sucesso', () => {
    let response = {};

    beforeAll(async () => {
      const { body: { token } } = await supertest(app)
      .post('/employees')
      .send(employeeSuccess);

      response = await supertest(app)
      .get('/employees')
      .set('authorization', token)
  });

    afterAll(async () => {
      const { email } = employeeSuccess;
      await Employee.destroy({ where: { email } });
    });

    test('Retorna o código de status 200', () => {
      expect(response.statusCode).toEqual(200);
    });

    test('Retorna um array', () => {
      expect(typeof response).toBe('array');
    });

  });

  describe('Quando o token da requisição não é enviado', () => {
    let response = {};

    beforeAll(async () => {
      await supertest(app)
      .post('/employees')
      .send(employeeFail);

      response = await supertest(app)
      .get('/employees')
  });

    afterAll(async () => {
      const { email } = employeeFail;
      await Employee.destroy({ where: { email } });
    });


    test('Retorna o código de status 401', () => {
      expect(response.statusCode).toEqual(401);
    });

    test('Retorna um objeto', () => {
      expect(typeof response).toBe('object');
    });

    test('O objeto possui uma mensagem de erro', () => {
      expect(response.body).toHaveProperty('message');
    });
  });

  describe('Quando o token da requisição é inválido', () => {
    let response = {};

    beforeAll(async () => {
      await supertest(app)
      .post('/employees')
      .send(employeeFail);

      response = await supertest(app)
      .get('/employees')
      .set("authorization", "tokenInválido123")
  });

    afterAll(async () => {
      const { email } = employeeFail;
      await Employee.destroy({ where: { email } });
    });


    test('Retorna o código de status 401', () => {
      expect(response.statusCode).toEqual(401);
    });

    test('Retorna um objeto', () => {
      expect(typeof response).toBe('object');
    });

    test('O objeto possui uma mensagem de erro', () => {
      expect(response.body).toHaveProperty('message');
    });

    test('A mensagem de erro possui o texto correspondente', () => {
      expect(response.body.message).toEqual('Expired or invalid token');
    });
  });
});