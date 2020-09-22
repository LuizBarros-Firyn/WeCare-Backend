const express = require('express');
const PasswordRecoveryController = require('../controllers/PasswordRecoveryController');
const PasswordRecoveryValidator = require('../validators/PasswordRecoveryValidator');

const accountsRouter = express.Router();

accountsRouter.post(
  '/password_recovery',
  PasswordRecoveryValidator.create,
  PasswordRecoveryController.create
);
accountsRouter.put(
  '/password_recovery',
  PasswordRecoveryValidator.update,
  PasswordRecoveryController.update
);

module.exports = accountsRouter;
