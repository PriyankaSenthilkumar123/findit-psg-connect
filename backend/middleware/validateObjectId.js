const mongoose = require('mongoose');

// Validates that a route parameter is a well-formed MongoDB ObjectId.
// Without this, values like "abc" reach Mongoose and throw a CastError, which the
// controllers' catch blocks surface as a generic 500 "Server error" instead of a 400.
module.exports = (paramName = 'id') => (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params[paramName])) {
    return res.status(400).json({
      success: false,
      message: `Invalid ${paramName} format`
    });
  }

  next();
};
