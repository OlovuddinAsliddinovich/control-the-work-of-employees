const BaseError = require("../errors/base.error");
const Employee = require("../models/employee-model");
const { validateAccessToken } = require("../services/token.service");

module.exports = async function authMiddleware(req, res, next) {
  try {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      throw BaseError.UnatuhorizedError();
    }

    const accessToken = authorization.split(" ")[1];
    const { id } = validateAccessToken(accessToken);

    const employee = await Employee.findById(id).select("-password");
    if (!employee) {
      throw BaseError.UnatuhorizedError();
    }
    req.employee = employee;
    next();
  } catch (error) {
    console.log(error);
    next(BaseError.UnatuhorizedError());
  }
};
