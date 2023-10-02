const express = require("express");
const { loginUser, signupUser } = require("../controllers/users.controller");
const { userRoutes } = require("../constants/");

const userRouter = express.Router({ mergeParams: true });

// login route

userRouter.post(userRoutes.LOGIN_USER, loginUser);

// signup route

userRouter.post(userRoutes.SIGNUP_USER, signupUser);

module.exports = userRouter;
