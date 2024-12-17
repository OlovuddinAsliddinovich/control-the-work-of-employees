const BaseError = require("../errors/base.error");
const Admin = require("../models/admin.model");
const { validateAdminToken } = require("../services/token.service");

async function adminAuthMiddleware(req, res, next) {
  try {
    const adminToken = req.cookies.adminToken;
    if (!adminToken) {
      throw BaseError.AdminUnauthorizedError();
    }

    const { id } = validateAdminToken(adminToken);

    const admin = await Admin.findById(id).select("-password");

    req.admin = admin;
    next();
  } catch (error) {
    console.log(error);
    next(BaseError.AdminUnauthorizedError());
  }
}

function adminMiddleware(req, res, next) {
  if (req.admin.role !== "admin") {
    throw BaseError.AdminUnauthorizedError();
  }
  next();
}

module.exports = { adminAuthMiddleware, adminMiddleware };
