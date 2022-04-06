const supertest = require('supertest');
const { Employee } = require('../../src/api/models');
const app = require('../../src/app');

const employees = [
  {
    name: "Veiagr sobrenome",
    email: "yordle@gbox.com.br",
    department: "Back-end",
    salary: "5114.00",
    birth_date: "01-01-1983",
    password: "senhadificil123"
  }, 
  {
    name: "Alistar sobrenome",
    email: "touro@gbox.com.br",
    department: "Back-end",
    salary: "5947.00",
    birth_date: "01-01-1983",
    password: "senhadificil123"
  },
  {
    name: "Sonic sobrenome",
    email: "ouriço@gbox.com.br",
    department: "Back-end",
    salary: "5497.00",
    birth_date: "01-01-1983",
    password: "senhadificil123"
  }
];
describe('GET /reports/employees/salary', () => {
  describe('Lista todos os employees com sucesso', () => {
    let response = {};

    beforeAll(async () => {
      const { body: { token } } = await supertest(app)
      .post('/employees')
      .send(employees[0]);

      await supertest(app)
      .post('/employees')
      .send(employees[1]);

      await supertest(app)
      .post('/employees')
      .send(employees[2]);

      response = await supertest(app)
      .get('/reports/employees/salary')
      .set('authorization', token)
  });

    afterAll(async () => {
        const employee0 = employees[0].email;
        const employee1 = employees[1].email;
        const employee2 = employees[2].email;
        await Employee.destroy({ where: { employee0 } });
        await Employee.destroy({ where: { employee1 } });
        await Employee.destroy({ where: { employee2 } });
    });

    test('Retorna o código de status 200', () => {
      expect(response.statusCode).toEqual(200);
    });

    test('Retorna um objeto', () => {
      expect(typeof response).toBe('object');
    });

  });

  describe('Quando o token da requisição não é enviado', () => {
    let response = {};

    beforeAll(async () => {
      await supertest(app)
      .post('/employees')
      .send(employees[0]);

      await supertest(app)
      .post('/employees')
      .send(employees[1]);

      await supertest(app)
      .post('/employees')
      .send(employees[2]);

      response = await supertest(app)
      .get('/reports/employees/salary')
      .set('authorization')
  });

    afterAll(async () => {
      const employee0 = employees[0].email;
      const employee1 = employees[1].email;
      const employee2 = employees[2].email;
      await Employee.destroy({ where: { employee0 } });
      await Employee.destroy({ where: { employee1 } });
      await Employee.destroy({ where: { employee2 } });
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
      .send(employees[0]);

      await supertest(app)
      .post('/employees')
      .send(employees[1]);

      await supertest(app)
      .post('/employees')
      .send(employees[2]);

      response = await supertest(app)
      .get('/reports/employees/salary')
      .set('authorization', 'tokenInválido')
  });

    afterAll(async () => {
      const employee0 = employees[0].email;
      const employee1 = employees[1].email;
      const employee2 = employees[2].email;
      await Employee.destroy({ where: { employee0 } });
      await Employee.destroy({ where: { employee1 } });
      await Employee.destroy({ where: { employee2 } });
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