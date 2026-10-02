const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  registerForEvent,
  getUserRegistrations,
  cancelRegistration,
  getAllRegistrations,
} = require('../controllers/registrationController');
const { protect, authorize } = require('../middleware/auth');

// Validation middleware
const registrationValidation = [
  body('eventId')
    .notEmpty()
    .withMessage('Event ID is required')
    .isMongoId()
    .withMessage('Invalid Event ID'),
];

// Routes
router.post('/', protect, registrationValidation, registerForEvent);
router.get('/user', protect, getUserRegistrations);
router.get('/', protect, authorize('admin'), getAllRegistrations);
router.delete('/:id', protect, cancelRegistration);

module.exports = router;
