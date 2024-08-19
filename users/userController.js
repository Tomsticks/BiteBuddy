const catchAsync = require('../utils/catchAsync');
exports.user = catchAsync(async (req, res, next) => {
  const user = await req.currentUser;
  if (!user) {
    next(new Error('You must be logged in to view this page'));
  }

  res.status(201).json({
    status: 'success',
    data: {
      user,
    },
  });

  next();
});
