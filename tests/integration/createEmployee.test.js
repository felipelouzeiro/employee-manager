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

describe('POST /employees', () => {
  describe('Quando o employee é cadastrado com sucesso', () => {
    let response = {};

    beforeAll(async () => {
      response = await supertest(app)
      .post('/employees')
      .send(employeeSuccess);
  });

    afterAll(async () => {
      const { email } = employeeSuccess;
      await Employee.destroy({ where: { email } });
    });


    test('Retorna o código de status 201', () => {
      expect(response.statusCode).toEqual(201);
    });

    test('Retorna um objeto', () => {
      expect(typeof response).toBe('object');
    });

    test('O objeto possui um token', () => {
      expect(response.body).toHaveProperty('token');
    });
  });

  describe('Quando o body da requisição é inválido', () => {
    let response = {};

    beforeAll(async () => {
      response = await supertest(app)
      .post('/employees')
      .send(employeeFail);
  });

    afterAll(async () => {
      const { email } = employeeFail;
      await Employee.destroy({ where: { email } });
    });


    test('Retorna o código de status 404', () => {
      expect(response.statusCode).toEqual(404);
    });

    test('Retorna um objeto', () => {
      expect(typeof response).toBe('object');
    });

    test('O objeto possui uma mensagem de erro', () => {
      expect(response.body).toHaveProperty('message');
    });
  });

});