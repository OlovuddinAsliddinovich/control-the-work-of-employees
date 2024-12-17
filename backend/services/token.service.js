const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  const accessToken = jwt.sign({ id }, process.env.jwt_access_secret, {
    expiresIn: "1d",
  });

  const refreshToken = jwt.sign({ id }, process.env.jwt_refresh_secret, { expiresIn: "30d" });

  return { accessToken, refreshToken };
};

const validateAccessToken = (token) => {
  return jwt.verify(token, process.env.jwt_access_secret);
};

const validateRefreshToken = (token) => {
  return jwt.verify(token, process.env.jwt_refresh_secret);
};

const generateAdminToken = (id) => {
  return jwt.sign({ id }, process.env.jwt_admin_secret, { expiresIn: "1d" });
};

const validateAdminToken = (token) => {
  return jwt.verify(token, process.env.jwt_admin_secret);
};

module.exports = { generateToken, validateAccessToken, validateRefreshToken, generateAdminToken, validateAdminToken };
