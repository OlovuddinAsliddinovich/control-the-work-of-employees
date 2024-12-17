module.exports = class BaseError extends Error {
  status;
  errors;

  constructor(status, message, errors) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnatuhorizedError() {
    return new BaseError(401, "Xodim Ro'yxatdan o'tkazilmagan");
  }

  static AdminUnauthorizedError() {
    return new BaseError(401, "Admin ro'yxatdan o'tmagan");
  }

  static BadRequest(message, errors = []) {
    return new BaseError(400, message, errors);
  }
};
