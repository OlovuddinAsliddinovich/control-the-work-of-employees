const AuthController = require("../controller/auth.controller");
const { adminAuthMiddleware, adminMiddleware } = require("../middlewares/admin.auth.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

const userRoute = require("express").Router();

userRoute.post("/register", adminAuthMiddleware, adminMiddleware, AuthController.register);

userRoute.post("/login", AuthController.login);

userRoute.get("/get-user", authMiddleware, AuthController.getUser);

userRoute.patch("/update", authMiddleware, AuthController.updateUser);

userRoute.post("/logout", authMiddleware, AuthController.logout);

userRoute.delete("/delete/:id", adminAuthMiddleware, adminMiddleware, AuthController.deleteUser);

userRoute.get("/users", AuthController.getUsers);

userRoute.get("/users/:id", adminAuthMiddleware, adminMiddleware, AuthController.getUserById);

userRoute.patch("/update/:id", adminAuthMiddleware, adminMiddleware, AuthController.updateUserById);

module.exports = userRoute;
