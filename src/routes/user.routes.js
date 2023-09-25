const express = require('express');
const userController = require('../controllers/users.controller');
const {userRoutes} = require('../constants/');

const userRouter = express.Router({ mergeParams: true });

// userRouter.post(userRoutes.CREATE_USER, userController.createUser);
userRouter.post('/create-user', userController.createUser);

module.exports = userRouter;
