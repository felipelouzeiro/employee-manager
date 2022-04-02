const jwt = require('jsonwebtoken');
const handlingError = require('./handlingError');

require('dotenv').config();

const { JWT_SECRET } = process.env;

const JWT_CONFIG = {
  expiresIn: '2d',
  algorithm: 'HS256',
};

const tokenGenerate = (data) => jwt.sign({ data }, JWT_SECRET, JWT_CONFIG);

const tokenValidate = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded.data.email;
  } catch (error) {
    throw handlingError(401, 'Expired or invalid token');
  }
};

module.exports = {
  tokenGenerate,
  tokenValidate,
};
