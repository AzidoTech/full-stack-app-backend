const User = require("../models/users.model");

const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login user

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const role = await user.role;
    const isUserVerified = await user.isUserVerified;
    console.log(role);
    // create a token

    const token = createToken(user._id);

    res.status(200).json({ email, role, isUserVerified, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup user

const signupUser = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const user = await User.signup(email, password, firstName, lastName);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser };
