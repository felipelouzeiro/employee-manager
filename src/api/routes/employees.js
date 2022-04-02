const express = require('express');
const authMiddlware = require('../../middlewares/authMiddlware');
const { createEmployee, login, getEmployees } = require('../controllers/employee');

const router = express.Router({ mergeParams: true });
router.post('/', createEmployee);
router.post('/login', login)
router.get('/', authMiddlware, getEmployees) // apartir daqui será necessário a autenticação

module.exports = router;