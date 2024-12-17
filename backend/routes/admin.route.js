const AdminController = require("../controller/admin.controller");
const { adminAuthMiddleware, adminMiddleware } = require("../middlewares/admin.auth.middleware");

const adminRoute = require("express").Router();

adminRoute.post("/create", AdminController.create);

adminRoute.post("/login", AdminController.loginAdmin);

adminRoute.get("/get-admin", adminAuthMiddleware, adminMiddleware, AdminController.getAdmin);

module.exports = adminRoute;
