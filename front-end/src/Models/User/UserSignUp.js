class UserSignUp {
  constructor(
    firstname,
    lastname,
    username,
    email,
    password,
    company,
    city,
    role
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.email = email;
    this.password = password;
    this.company = company;
    this.numberOfTrucks = 0;
    this.city = city;
    this.role = role;
  }
}

export default UserSignUp;
