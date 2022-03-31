const express = require('express');
const employees = require('./employees');

const router = express.Router({ mergeParams: true });
router.use('/employees', employees);

module.exports = router;