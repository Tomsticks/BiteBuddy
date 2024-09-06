const product = require('../Products/productModel');
const catchAsync = require('../utils/catchAsync');

exports.createProduct = catchAsync(async (req, res, next) => {
  const newProduct = await product.create(req.body);
  res.status(201).json({
    status: 'success',
    newProduct,
  });
});
