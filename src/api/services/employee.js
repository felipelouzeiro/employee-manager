const { employeeSchema } = require("../../utils/schemas/schemas");
const { Employee } = require("../models");
const handlingError = require("../../utils/helpers/handlingError")

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



module.exports = {
  create,
}
