const AdminService = require("../services/admin.service");

class AdminController {
  async create(req, res, next) {
    try {
      const admin = await AdminService.create(req.body);
      res.status(201).json(admin);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async loginAdmin(req, res, next) {
    try {
      const { username, password } = req.body;
      const admin = await AdminService.loginAdmin({ username, password });
      res.cookie("adminToken", admin.token, { httOnly: true, maxAge: 1 * 24 * 60 * 60 * 1000 });
      return res.status(200).json(admin);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getAdmin(req, res, next) {
    try {
      const admin = await AdminService.getAdmin(req.admin);
      return res.status(200).json(admin);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = new AdminController();
