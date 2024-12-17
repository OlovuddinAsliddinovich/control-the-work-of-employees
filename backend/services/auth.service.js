const EmployeeDto = require("../dtos/employe.dto");
const Employee = require("../models/employee-model");
const { hashPassword, comparePassword } = require("../modules/bcrypt");
const FileService = require("./file.service");
const { generateToken, validateAccessToken } = require("./token.service");

class AuthService {
  async register({ email, firstname, lastname, password, level }, picture) {
    const existEmployee = await Employee.findOne({ email });
    if (existEmployee) throw new Error("Bunday foydalanuvchi mavjud");

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
    if (!employee) throw new Error("Bunday foydalanuvchi mavjud emas!");

    const isValidPassword = await comparePassword(password, employee.password);
    if (!isValidPassword) throw new Error("Parol xato!");

    const employeeDto = new EmployeeDto(employee);

    const tokens = generateToken(employeeDto.id);

    return { employee: employeeDto, ...tokens };
  }

  async getUser(authorization) {
    const accessToken = authorization.split(" ")[1];

    const { id } = validateAccessToken(accessToken);

    const existUser = await Employee.findOne({ _id: id }).select("-password");
    if (!existUser) throw new Error("Bunday foydalanuvchi mavjud emas!");

    const userDto = new EmployeeDto(existUser);

    return userDto;
  }

  async updateUser(user, picture, authorization) {
    if (!authorization || !authorization.startsWith("Bearer ")) {
      throw new Error("Authorization header noto'g'ri!");
    }
    const accessToken = authorization.split(" ")[1];

    const { id } = await validateAccessToken(accessToken);
    if (!id) throw new Error("Token mavjud emas!");

    const existUser = await Employee.findOne({ _id: id });
    if (!existUser) throw new Error("Bunday foydalanuvchi mavjud emas!");

    if (user.email && user.email !== existUser.email) {
      const emailExists = await Employee.findOne({ email: user.email });
      if (emailExists) {
        throw new Error("Bu email allaqachon boshqa foydalanuvchiga tegishli.");
      }
    }

    let image = existUser.image;
    if (picture) {
      try {
        FileService.deleteImage(existUser.image);
        image = FileService.saveImage(picture);
      } catch (err) {
        throw new Error("Rasmni yangilashda xatolik yuz berdi.");
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

    if (!employee) throw new Error("Foydalanuvchini yangilashda xatolik yuz berdi.");

    const employeeDto = new EmployeeDto(employee);
    const tokens = generateToken(employeeDto.id);

    return { user: employeeDto, ...tokens };
  }

  async deleteUser(authorization) {
    if (!authorization || !authorization.startsWith("Bearer ")) {
      throw new Error("Authorization header noto'g'ri!");
    }
    const accessToken = authorization.split(" ")[1];

    const { id } = await validateAccessToken(accessToken);
    if (!id) throw new Error("Token mavjud emas!");

    const existUser = await Employee.findOne({ _id: id });
    if (!existUser) throw new Error("Bunday foydalanuvchi mavjud emas!");

    const image = existUser.image;
    FileService.deleteImage(image);

    const deletedUser = await Employee.findOneAndDelete({ _id: id });
    if (!deletedUser) throw new Error("Foydalanuvchini o'chirishda xatolik yuz berdi.");

    return deletedUser;
  }
}

module.exports = new AuthService();
