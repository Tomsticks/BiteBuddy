const express = require('express');
const app = express();
const authRoute = require('./auth/router');
const userRoute = require('./users/router');
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);

// app.all('*', (req, res, next) => {
//   next(new Error('Route not found'));
// });

module.exports = app;
