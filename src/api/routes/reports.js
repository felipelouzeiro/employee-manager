const express = require('express');
const authMiddlware = require('../../middlewares/authMiddlware');
const { employeeReportSalary } = require('../controllers/employee');

const router = express.Router({ mergeParams: true });

router.get('/salary', authMiddlware, employeeReportSalary);

module.exports = router;