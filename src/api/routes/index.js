const express = require('express');
const employees = require('./employees');
const reports = require('./reports');

const router = express.Router({ mergeParams: true });
router.use('/reports/employees', reports);
router.use('/employees', employees);

module.exports = router;