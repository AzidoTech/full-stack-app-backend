const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const randomstring = require("randomstring");
const validator = require("validator");

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//static signup method

UserSchema.statics.signup = async function (
  email,
  password,
  firstName,
  lastName
) {
  //validation

  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("User with same email already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    email,
    password: hash,
    firstName,
    lastName,
  });

  await user.save();

  return user;
};

UserSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  // find user in database

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect username or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw Error("Incorrect username or password");
  }

  return user;
};

module.exports = model("User", UserSchema);
