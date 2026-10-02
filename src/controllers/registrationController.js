const Registration = require('../models/Registration');
const Event = require('../models/Event');
const { validationResult } = require('express-validator');

// @desc    Register for an event
// @route   POST /api/registrations
// @access  Private
exports.registerForEvent = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { eventId } = req.body;

    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }

    // Check if event is full
    if (event.registeredCount >= event.capacity) {
      return res.status(400).json({
        success: false,
        message: 'Event is fully booked',
      });
    }

    // Check if already registered
    const existingRegistration = await Registration.findOne({
      user: req.user.id,
      event: eventId,
      status: 'registered',
    });

    if (existingRegistration) {
      return res.status(400).json({
        success: false,
        message: 'Already registered for this event',
      });
    }

    // Create registration
    const registration = await Registration.create({
      user: req.user.id,
      event: eventId,
    });

    // Update event registered count
    event.registeredCount += 1;
    await event.save();

    res.status(201).json({
      success: true,
      data: registration,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user registrations
// @route   GET /api/registrations/user
// @access  Private
exports.getUserRegistrations = async (req, res, next) => {
  try {
    const registrations = await Registration.find({
      user: req.user.id,
      status: 'registered',
    })
      .populate('event')
      .sort({ registeredAt: -1 });

    res.status(200).json({
      success: true,
      count: registrations.length,
      data: registrations,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Cancel registration
// @route   DELETE /api/registrations/:id
// @access  Private
exports.cancelRegistration = async (req, res, next) => {
  try {
    const registration = await Registration.findById(req.params.id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found',
      });
    }

    // Check ownership
    if (registration.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this registration',
      });
    }

    // Update registration status
    registration.status = 'cancelled';
    registration.cancelledAt = Date.now();
    await registration.save();

    // Update event registered count
    const event = await Event.findById(registration.event);
    if (event && event.registeredCount > 0) {
      event.registeredCount -= 1;
      await event.save();
    }

    res.status(200).json({
      success: true,
      message: 'Registration cancelled successfully',
      data: registration,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all registrations (admin only)
// @route   GET /api/registrations
// @access  Private/Admin
exports.getAllRegistrations = async (req, res, next) => {
  try {
    const registrations = await Registration.find()
      .populate('user', 'name email')
      .populate('event', 'title date')
      .sort({ registeredAt: -1 });

    res.status(200).json({
      success: true,
      count: registrations.length,
      data: registrations,
    });
  } catch (error) {
    next(error);
  }
};
