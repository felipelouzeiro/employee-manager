require('dotenv').config()

module.exports = {
  HOST: "localhost",
  USER: process.env.USER_DB,
  PASSWORD: process.env.PASSWORD_DB,
  DB: 'employee_manager',
  dialect: "mysql"
};