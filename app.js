const express = require('express');
const app = express();
const authRoute = require('./auth/router');
const userRoute = require('./users/router');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.get('/awake', (req, res) => {
  res.send('Keep hosting awake');
});
app.use(morgan('tiny'));
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);

// app.all('*', (req, res, next) => {
//   next(new Error('Route not found'));
// });

module.exports = app;
