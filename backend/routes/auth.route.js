const AuthController = require("../controller/auth.controller");

const userRoute = require("express").Router();

userRoute.post("/register", AuthController.register);

userRoute.post("/login", AuthController.login);

userRoute.get("/get-user", AuthController.getUser);

userRoute.patch("/update", AuthController.updateUser);

userRoute.post("/logout", AuthController.logout);

userRoute.delete("/delete", AuthController.deleteUser);

module.exports = userRoute;
