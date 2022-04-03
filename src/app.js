const express = require('express');
const employeeRoute = require("./api/routes")
const middleareError = require("./middlewares/errorMiddlware")

const app = express();
app.use(express.json());

const db = require("./api/models");
db.sequelize.sync();

app.use(employeeRoute);

app.use(middleareError);

module.exports = app;