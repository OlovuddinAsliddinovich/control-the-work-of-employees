const { model, Schema } = require("mongoose");

const adminSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: "admin" },
});

const Admin = model("Admin", adminSchema);

module.exports = Admin;
