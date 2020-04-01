const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  // error.message = err.message;
  console.log('error...', err);
  //mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Bootcamp is not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }
  //mongoose duplicate key error
  if (err.code === 11000) {
    const message = 'duplicate field value entered';
    error = new ErrorResponse(message, 400);
  }

  // mongoose validation error
  if ((err.name = 'ValidationError')) {
    const message = Object.values(err.errors).map(val => val.message);
    console.log('my message', message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  });
};

module.exports = errorHandler;
