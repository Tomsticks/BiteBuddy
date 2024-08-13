require('dotenv').config();
const app = require('./app');

const mongoose = require('mongoose');
process.on('uncaughtException', (err) => {
  console.log('uncaughtException! .. Shutting Down.....💥💣💥🧨');
  console.log(err.name, err.message);
  process.exit(1);
});

mongoose
  .connect(
    'mongodb+srv://tscript:mira247a@tomzor.axomd8j.mongodb.net/bitebuddy'
  )
  .then(() => {
    console.log('database Connected');
  })
  .catch((err) => {
    console.log('check Internet connection', err);
  });

const server = app.listen(3050, () => {
  console.log('server is running on port 3050');
});
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message, err.stack);
  console.log('UhandleRejection! .. Shutting Down.....💥💣💥🧨');
  server.close(() => {
    process.exit(1);
  });
});
