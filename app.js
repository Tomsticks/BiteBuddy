const express = require('express');
const app = express();
const authRoute = require('./auth/router');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use('/api/auth', authRoute);

module.exports = app;
