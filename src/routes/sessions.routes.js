const express = require('express');
const SessionController = require('../controllers/SessionController');
const SessionValidator = require('../validators/SessionValidator');

const sessionsRouter = express.Router();

sessionsRouter.post('/', SessionValidator.create, SessionController.create);

module.exports = sessionsRouter;
