const catchAsync = require('../utils/catchAsync');
exports.user = catchAsync(async (req, res, next) => {
  const user = await req.currentUser;
  if (!user) {
    return res
      .status(401)
      .json({ message: 'You must be logged in to view this' });
  }

  res.status(201).json({
    status: 'success',
    data: {
      user,
    },
  });

  next();
});
