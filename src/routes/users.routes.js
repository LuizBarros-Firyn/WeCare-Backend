const express = require('express');
const UserController = require('../controllers/UserController');
const UserValidator = require('../validators/UserValidator');

const usersRouter = express.Router();

usersRouter.get('/', UserController.index);
usersRouter.get('/:user_id', UserValidator.byId, UserController.show);

usersRouter.post('/', UserValidator.create, UserController.store);

usersRouter.delete('/:user_id', UserValidator.byId, UserController.destroy);

module.exports = usersRouter;
