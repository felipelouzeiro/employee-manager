const { Employee } = require("../api/models");
const handlingError = require("../utils/helpers/handlingError");
const { tokenValidate } = require("../utils/helpers/JWT");

module.exports = async (req, _res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) { throw handlingError(401, 'Token not found'); }

    const validate = tokenValidate(authorization);

    if (!validate) { throw handlingError(401, 'Expired or invalid token') }

    const user = await Employee.findOne({ where: { email: validate } });
    req.user = user; // passando conteúdo do usuario logado para as próximas rotas
  } catch (error) {
    next(error);
  }
  next();
};