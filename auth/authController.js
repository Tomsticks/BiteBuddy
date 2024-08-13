const auth = require('../plugins/firebase');
const catchAsync = require('../utils/catchAsync');
const users = require('../users/userModel');

exports.register = catchAsync(async (req, res) => {
  const { name, email, password, username, number } = req.body;

  if (!name || !email || !password || !username || !number) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }

  try {
    const user = await auth.signup(email, password);
    // const token = await user.user.getIdToken(true);
    const uid = user.user.uid;
    if (user) {
      const newUser = await users.create({
        name: name,
        email: email,
        uid: uid,
        phoneNumber: number,
        username: username,
      });
    }

    res.send(user);
  } catch (error) {
    res.send(error);
  }
});

exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await auth.login(email, password);
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});

exports.loginWithNumber = catchAsync(async (req, res) => {
  const { number, otp } = req.body;
  try {
    const user = await auth.loginWithNumber(number, otp);
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});
