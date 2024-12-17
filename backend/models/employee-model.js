const { model, Schema } = require("mongoose");

const employeeSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      default: null,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Employee = model("Employee", employeeSchema);

module.exports = Employee;
