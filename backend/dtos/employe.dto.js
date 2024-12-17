class EmployeeDto {
  id;
  firstname;
  lastname;
  email;
  password;
  image;
  level;
  createdAt;
  updatedAt;

  constructor(employee) {
    this.id = employee._id;
    this.firstname = employee.firstname;
    this.lastname = employee.lastname;
    this.email = employee.email;
    this.password = employee.password;
    this.image = employee.image;
    this.level = employee.level;
    this.createdAt = employee.createdAt;
    this.updatedAt = employee.updatedAt;
  }
}

module.exports = EmployeeDto;
