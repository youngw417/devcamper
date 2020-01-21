const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  // error.message = err.message;
  console.log(error);
  //mongoose bad ObjectId
  if (error.name === 'CastError') {
    const message = `Bootcamp is not found with id of ${error.value}`;
    error = new ErrorResponse(message, 404);
  }
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  });
};

module.exports = errorHandler;
