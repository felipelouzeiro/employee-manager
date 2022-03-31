const express = require('express');
const { createEmployee, login } = require('../controllers/employee');

const router = express.Router({ mergeParams: true });
router.post('/', createEmployee);
router.post('/login', login)

module.exports = router;