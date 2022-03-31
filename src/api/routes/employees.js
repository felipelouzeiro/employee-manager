const express = require('express');
const { createEmployee } = require('../controllers/employee');

const router = express.Router({ mergeParams: true });
router.post('/', createEmployee);

module.exports = router;