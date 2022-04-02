const { employeeSchema, loginSchema } = require("../../utils/schemas/schemas");
const { Employee } = require("../models");
const handlingError = require("../../utils/helpers/handlingError")
const { tokenGenerate } = require("../../utils/helpers/JWT")

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

module.exports = {
  create,
  login,
  findAll,
}
