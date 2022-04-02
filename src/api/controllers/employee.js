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

const getEmployeeById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const employee = await employeeServices.getById(id);

    res.status(200).json(employee);
  } catch (error) {
    next(error);
  }
};

const deleleEmployeeById = async (req, res, next) => {
  try {
    const { id } = req.params;

    await employeeServices.deleteById(id);

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const updateEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, department, salary, birth_date, password } = req.body;

    const response = await employeeServices.update({ id, name, email, department, salary, birth_date, password })
    res.status(200).send(response);

  } catch (error) {
    next(error)
  }
}

module.exports = {
  createEmployee,
  login,
  getEmployees,
  getEmployeeById,
  deleleEmployeeById,
  updateEmployee,
}