const { tokenGenerate } = require("../../utils/helpers/JWT.JS");
const employeeServices = require("../services/employee")
const createEmployee = async (req, res, next) => {
  try {
    const { name, email, department, salary, birth_date, password } = req.body;

    const response = await employeeServices.create({ name, email, department, salary, birth_date, password });

    const { password: pass, ...withoutPassword } = response;

    const token = await tokenGenerate(withoutPassword);


    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createEmployee,
}