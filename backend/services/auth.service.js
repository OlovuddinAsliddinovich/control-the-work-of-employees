const EmployeeDto = require("../dtos/employe.dto");
const BaseError = require("../errors/base.error");
const Employee = require("../models/employee-model");
const { hashPassword, comparePassword } = require("../modules/bcrypt");
const FileService = require("./file.service");
const { generateToken, validateAccessToken } = require("./token.service");

class AuthService {
  async register({ email, firstname, lastname, password, level }, picture) {
    const existEmployee = await Employee.findOne({ email });
    if (existEmployee) throw BaseError.BadRequest("Bunday foydalanuvchi mavjud");

    const hashedPassword = await hashPassword(password);

    const image = FileService.saveImage(picture);

    const newEmployee = {
      firstname,
      lastname,
      email,
      password: hashedPassword,
      image,
      level,
    };

    const employee = await Employee.create(newEmployee);

    const employeeDto = new EmployeeDto(employee);
    const tokens = generateToken(employeeDto.id);

    return { employee: employeeDto, ...tokens };
  }

  async login({ email, password }) {
    const employee = await Employee.findOne({ email });
    if (!employee) throw BaseError.BadRequest("Bunday foydalanuvchi mavjud emas!");

    const isValidPassword = await comparePassword(password, employee.password);
    if (!isValidPassword) throw BaseError.BadRequest("Parol xato!");

    const employeeDto = new EmployeeDto(employee);

    const tokens = generateToken(employeeDto.id);

    return { employee: employeeDto, ...tokens };
  }

  async getUser(authorization) {
    const accessToken = authorization.split(" ")[1];

    const { id } = validateAccessToken(accessToken);

    const existUser = await Employee.findOne({ _id: id }).select("-password");
    if (!existUser) throw BaseError.BadRequest("Bunday foydalanuvchi mavjud emas!");

    const userDto = new EmployeeDto(existUser);

    return userDto;
  }

  async updateUser(user, picture, authorization) {
    if (!authorization || !authorization.startsWith("Bearer ")) {
      throw BaseError.BadRequest("Ro'yxatdan o'tilmagan!");
    }
    const accessToken = authorization.split(" ")[1];

    const { id } = await validateAccessToken(accessToken);
    if (!id) throw BaseError.BadRequest("Token mavjud emas!");

    const existUser = await Employee.findOne({ _id: id });
    if (!existUser) throw BaseError.BadRequest("Bunday foydalanuvchi mavjud emas!");

    if (user.email && user.email !== existUser.email) {
      const emailExists = await Employee.findOne({ email: user.email });
      if (emailExists) {
        throw BaseError.BadRequest("Bu email allaqachon boshqa foydalanuvchiga tegishli.");
      }
    }

    let image = existUser.image;
    if (picture) {
      try {
        FileService.deleteImage(existUser.image);
        image = FileService.saveImage(picture);
      } catch (err) {
        throw BaseError.BadRequest("Rasmni yangilashda xatolik yuz berdi.");
      }
    }

    if (user.password && user.password.trim() !== "") {
      user.password = await hashPassword(user.password);
    }

    const updatedUser = {
      ...user,
      image,
    };

    const employee = await Employee.findOneAndUpdate({ _id: id }, updatedUser, { new: true, runValidators: true });

    if (!employee) throw BaseError.BadRequest("Foydalanuvchini yangilashda xatolik yuz berdi.");

    const employeeDto = new EmployeeDto(employee);
    const tokens = generateToken(employeeDto.id);

    return { user: employeeDto, ...tokens };
  }

  async deleteUser(id) {
    const existUser = await Employee.findOne({ _id: id });
    if (!existUser) throw BaseError.BadRequest("Bunday foydalanuvchi mavjud emas!");

    const image = existUser.image;
    FileService.deleteImage(image);

    const deletedUser = await Employee.findOneAndDelete({ _id: id });
    if (!deletedUser) throw BaseError.BadRequest("Foydalanuvchini o'chirishda xatolik yuz berdi.");

    return deletedUser;
  }
}

module.exports = new AuthService();
