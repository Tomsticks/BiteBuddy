const catchAsync = require('../utils/catchAsync');
const Resturant = require('../Restaurant/resModel');

exports.addResturant = catchAsync(async (req, res, next) => {
  const newResturant = await Resturant.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      resturant: newResturant,
    },
  });
});
