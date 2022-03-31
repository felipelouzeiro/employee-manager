const express = require('express');

const app = express();
app.use(express.json());

app.use('/', (req, res) => {
  res.send({message: "funcionando"})
});

module.exports = app;