const { Employee } = require("../models");

const create = async ({ name, email, department, salary, birth_date, password }) => {

  const response = await Employee.create({ name, email, department, salary, birth_date, password });
  return response.dataValues;
};



module.exports = {
  create,
}