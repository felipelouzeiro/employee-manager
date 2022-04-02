const { employeeSchema, loginSchema } = require("../../utils/schemas/schemas");
const { Employee } = require("../models");
const handlingError = require("../../utils/helpers/handlingError");
const { tokenGenerate } = require("../../utils/helpers/JWT");

const create = async ({ name, email, department, salary, birth_date, password }) => {
  try {
    await employeeSchema.validate({ name, email, department, salary, birth_date, password })
  } catch (error) {
    if (error) { throw handlingError(404, error.errors[0]); }
  }

  const alreadyEmployee = await Employee.findOne({ where: { email } });

  if (alreadyEmployee) { throw handlingError(409, 'Employee already registered'); }

  const response = await Employee.create({ name, email, department, salary, birth_date, password });
  return response.dataValues;
};

const login = async ({email, password}) => {
  try {
    await loginSchema.validate({ email, password })
  } catch (error) {
    if (error) { throw handlingError(404, error.errors[0]); }
  }
  
  const employeeFound = await Employee.findOne({ where: { email } });
  
  if (!employeeFound || employeeFound.password !== password) {
    throw handlingError(404, 'Invalid e-mail or password');
  } 
  
  const { password: pass, ...userWithoutPassword } = employeeFound.dataValues;
  
  const token = tokenGenerate(userWithoutPassword);

  return { token };
};

const findAll = async () => {
  const employees = await Employee.findAll({ attributes: { exclude: 'password' } });

  return employees;
};

const getById = async (id) => {
  const employee = await Employee.findByPk(id);

  if (!employee) { throw handlingError(404, 'Employee not registered'); }

  return employee;
};

const deleteById = async (id) => {
  await Employee.destroy({
    where: { id: id } });
};

const update = async ({ id, name, email, department, salary, birth_date, password }) => {
  try {
    await employeeSchema.validate({ name, email, department, salary, birth_date, password })
  } catch (error) {
    if (error) { throw handlingError(404, error.errors[0]); }
  }

  const registeredEmployee = await Employee.findByPk(id);

  if (!registeredEmployee) { throw handlingError(404, 'Employee not registered'); }

  const response = await Employee.update(
    { name, email, department, salary, birth_date, password },
    { where: { id: id } });

  return response.dataValues;
}

const reportSalary = async () => {
  const employees = await Employee.findAll({ attributes: { exclude: 'password' } }); // retorna array

  if (employees.length < 1) { throw handlingError(404, 'No registered employees'); }

  const maxSalary = employees.reduce(function(prev, curr ) {
    return (Number(prev.salary) > Number(curr.salary)) ? prev : curr
  });
  
  const minSalary = employees.reduce(function(prev, curr ) {
    return (Number(prev.salary) < Number(curr.salary)) ? prev : curr
  });

  const sumSalaries = employees.map(employee => employee.salary)
    .reduce((prev, curr) => prev + Number(curr), 0);

  const average = (sumSalaries / employees.length).toFixed(2).toString();

  return {
    "lowest": minSalary,
    "highest": maxSalary,
    "average": average,
  }
}

module.exports = {
  create,
  login,
  findAll,
  getById,
  deleteById,
  update,
  reportSalary,
}

// --- Solução alternativa ---

// const minSalary = await Employee.findAll({
//   where: sequelize.where([sequelize.fn('min', sequelize.col('salary')), 'minSalary']),
// });

// const maxSalary = await Employee.findAll({
//   where: sequelize.where([sequelize.fn('min', sequelize.col('salary')), 'minSalary']),
// });