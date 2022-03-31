const employeeServices = require("../services/employee")
const createEmployee = async (req, res, next) => {
  try {
    const { name, email, department, salary, birth_date, password } = req.body;

    const response = await employeeServices.create({ name, email, department, salary, birth_date, password });

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createEmployee,
}
