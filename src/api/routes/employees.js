const express = require('express');
const authMiddlware = require('../../middlewares/authMiddlware');
const { 
  createEmployee, 
  login, 
  getEmployees, 
  getEmployeeById, 
  deleleEmployeeById, 
  updateEmployee, 
  employeeReportSalary
} = require('../controllers/employee');

const router = express.Router({ mergeParams: true });
router.post('/', createEmployee);
router.post('/login', login);
router.get('/', authMiddlware, getEmployees); // apartir daqui será necessário a autenticação
router.get('/:id', authMiddlware, getEmployeeById);
router.delete('/:id', authMiddlware, deleleEmployeeById);
router.put('/:id', authMiddlware, updateEmployee);
router.get('/salary', authMiddlware, employeeReportSalary);

module.exports = router;