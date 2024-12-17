const AuthService = require("../services/auth.service");

class AuthController {
  async register(req, res, next) {
    try {
      const file = req.files ? req.files.image : null;
      const user = await AuthService.register(req.body, file);
      res.cookie("refreshToken", user.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true });
      res.status(201).json(user);
    } catch (error) {
      console.log("Xato ", error);
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const user = await AuthService.login(req.body);
      res.cookie("refreshToken", user.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true });
      res.status(200).json(user);
    } catch (error) {
      console.log("Xato ", error);
      next(error);
    }
  }

  async getUser(req, res, next) {
    try {
      const authorization = req.headers.authorization;
      const user = await AuthService.getUser(authorization);
      res.status(200).json(user);
    } catch (error) {
      console.log("Xato ", error);
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      const file = req.files ? req.files.image : null;
      const authorization = req.headers.authorization;
      const user = await AuthService.updateUser(req.body, file, authorization);
      res.cookie("refreshToken", user.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true });
      res.status(200).json(user);
    } catch (error) {
      console.log("Xato ", error);
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      res.clearCookie("refreshToken");
      res.status(200).json({ message: "Siz dasturdan chiqdingiz!" });
    } catch (error) {
      console.log("Xato ", error);
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const authorization = req.headers.authorization;
      const user = await AuthService.deleteUser(authorization);
      res.clearCookie("refreshToken");
      res.status(200).json(user);
    } catch (error) {
      console.log("Xato ", error);
      next(error);
    }
  }
}

module.exports = new AuthController();
