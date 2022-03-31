const express = require('express');

const app = express();
app.use(express.json());

const db = require("./api/models");
db.sequelize.sync();

app.use('/', (req, res) => {
  res.send({message: "funcionando"})
});

module.exports = app;