const auth = require('../plugins/firebase');
const catchAsync = require('../utils/catchAsync');
// const AppError = require('')
const users = require('../users/userModel');

exports.register = catchAsync(async (req, res) => {
  const { name, email, password, username, number } = req.body;

  if (!name || !email || !password || !username || !number) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }

  try {
    const user = await auth.signup(email, password, name);
    // const token = await user.user.getIdToken(true);
    const uid = user.user.uid;

    const newUser = await users.create({
      name: name,
      email: email,
      uid: uid,
      phoneNumber: number,
      username: username,
    });
    res.status(200).json({
      status: 'success',
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    res.status(400).json({
      code: error.code,
      message: error.message,
    });
  }
});

exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await auth.login(email, password);
    const userData = await users.find({
      uid: user.user.uid,
    });
    const token = await user.user.getIdToken();
    res.status(201).json({
      user: userData,
      token: token,
      status: 'Sucess',
    });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

// exports.loginWithNumber = catchAsync(async (req, res) => {
//   const { number, otp } = req.body;
//   try {
//     const user = await auth.loginWithNumber(number, otp);
//     res.send(user);
//   } catch (error) {
//     res.send(error);
//   }
// });

exports.isLogged = catchAsync(async (req, res, next) => {
  const user = await auth.activeUser();

  if (!user) {
    req.currentUser = null;
    return next(res.status(401).json({ message: 'You are not logged in' }));
  }
  const token = await user.getIdToken(
    false, // allowRefresh
    3600 // expiresIn
  );

  const userData = await users.find({
    uid: user.uid,
  });
  let activeUser = {
    user: userData,
    token: token,
  };
  req.currentUser = activeUser;

  next();
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const user = await auth.reset(email);
    res.status(201).json({
      message: 'Email sent successfully',
    });
  } catch (error) {
    res.send(error);
  }
});

exports.updateUserPassword = catchAsync(async (req, res, next) => {
  const { password } = req.body;
  const currentUser = req.currentUser.uid;
  console.log(currentUser);
  try {
    const user = await auth.changePassword(currentUser, password);
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});

// exports.

exports.logOut = catchAsync(async (req, res, next) => {
  const logOut = await auth.signout();
  console.log(logOut);

  res.status(200).json({ message: 'You have been logged out' });
  next();
});
