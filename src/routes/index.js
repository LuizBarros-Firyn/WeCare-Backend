const express = require('express');
const usersRouter = require('./users.routes');
const accountsRouter = require('./accounts.routes');
const sessionsRouter = require('./sessions.routes');

const routes = express.Router();

routes.use('/users', usersRouter);
routes.use('/accounts', accountsRouter);
routes.use('/sessions', sessionsRouter);

routes.get('/', (request, response) => response.json({ message: 'Hello!' }));

module.exports = routes;
