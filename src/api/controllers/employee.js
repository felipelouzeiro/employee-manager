const { tokenGenerate } = require("../../utils/helpers/JWT.js");
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

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const token = await employeeServices.login({email, password});

    return res.status(200).json(token);
  } catch (err) {
    next(err);
  }
};

const getEmployees = async (_req, res, next) => {
  try {
    const employees = await employeeServices.findAll();

    return res.status(200).json(employees);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createEmployee,
  login,
  getEmployees,
}