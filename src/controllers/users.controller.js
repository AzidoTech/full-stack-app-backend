const UserModel = require("../models/users.model");

module.exports.createUser = async (request, response) => {
  const { userName, email, password } = request.body;
  let newUserObj = { userName, email, password };
  console.log(request.body);
  try {
    const newUser = new UserModel(newUserObj);
    await newUser.save();
    const { _id, email } = newUser;
    return response.status(201).json({
      message: "user created successfully",
      data: newUser,
    });
  } catch (error) {
    console.log("error => ", error);
    return response.status(400).json({
      message: "Unable to create user.",
      error,
    });
  }
};
