require('dotenv').config();

const express = require('express');
const routes = require('./routes/index');

require('./database');

const app = express();

app.use(express.json());

app.use(routes);

// eslint-disable-next-line no-console
app.listen(3333, () => console.log('Up and running! ! !'));
