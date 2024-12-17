const BaseError = require("../errors/base.error");
const Admin = require("../models/admin.model");
const { hashPassword, comparePassword } = require("../modules/bcrypt");
const { generateAdminToken } = require("./token.service");

class AdminService {
  async create(payload) {
    const { username, password, role } = payload;

    const existAdmin = await Admin.findOne({ username });
    if (existAdmin) throw BaseError.BadRequest("Bu admin mavjud!");

    const hashedPassword = await hashPassword(password);

    const newAdmin = {
      username,
      password: hashedPassword,
      role,
    };

    const admin = await Admin.create(newAdmin);

    return admin;
  }

  async loginAdmin(payload) {
    const { username, password } = payload;

    const admin = await Admin.findOne({ username });
    if (!admin) throw BaseError.BadRequest("Admin topilmadi!");

    const isValidPassword = await comparePassword(password, admin.password);
    if (!isValidPassword) throw BaseError.BadRequest("Parol xato!");

    const token = await generateAdminToken(admin._id);

    return { admin, token };
  }

  async getAdmin(admin) {
    if (!admin) throw BaseError.BadRequest("Admin topilmadi!");

    const adminData = await Admin.findById(admin._id).select("-password");

    return adminData;
  }
}

module.exports = new AdminService();
