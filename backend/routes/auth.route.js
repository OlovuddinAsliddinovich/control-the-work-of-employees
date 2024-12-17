const AuthController = require("../controller/auth.controller");
const { adminAuthMiddleware, adminMiddleware } = require("../middlewares/admin.auth.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

const userRoute = require("express").Router();

userRoute.post("/register", adminAuthMiddleware, adminMiddleware, AuthController.register);

userRoute.post("/login", AuthController.login);

userRoute.get("/get-user", authMiddleware, AuthController.getUser);

userRoute.patch("/update", authMiddleware, AuthController.updateUser);

userRoute.post("/logout", authMiddleware, AuthController.logout);

userRoute.delete("/delete", adminAuthMiddleware, adminMiddleware, AuthController.deleteUser);

module.exports = userRoute;
