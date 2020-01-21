const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');
// @desc    Get all bootcamps
// @route   GET /api/vi/bootcamps
// @access  Public
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    res.status(200).json({
      success: true,
      count: bootcamps.length,
      data: bootcamps
    });
  } catch (error) {
    next(error);
  }
};
// @desc    Get single bootcamps
// @route   GET /api/vi/bootcamps/:id
// @access  Public
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp)
      return res.status(400).json({
        success: false
      });
    res.status(200).json({
      success: true,
      data: bootcamp
    });
  } catch (error) {
    next(error);
  }
};
// @desc    Create new bootcamps
// @route   POST /api/vi/bootcamps
// @access  Private
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({
      success: true,
      data: bootcamp
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update bootcamp
// @route   PUT api/vi/bootcamps/:id
// @access  Private
exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!bootcamp)
      return res.status(400).json({
        success: false
      });

    res.status(200).json({
      success: true,
      data: bootcamp
    });
  } catch (error) {
    res.status(400).json({
      success: false
    });
  }
};

// @desc    Delete bootcamp
// @route   DELETE api/vi/bootcamps/:id
// @access  Private
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if (!bootcamp)
      return res.status(400).json({
        success: false
      });

    res.status(200).json({});
  } catch (error) {
    next(error);
  }
};
