const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventController');
const { protect } = require('../middleware/auth');

// Validation middleware
const eventValidation = [
  body('title').notEmpty().withMessage('Event title is required'),
  body('description').notEmpty().withMessage('Event description is required'),
  body('date').notEmpty().withMessage('Event date is required').isISO8601(),
  body('location').notEmpty().withMessage('Event location is required'),
  body('capacity')
    .notEmpty()
    .withMessage('Event capacity is required')
    .isInt({ min: 1 })
    .withMessage('Capacity must be at least 1'),
];

// Routes
router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.post('/', protect, eventValidation, createEvent);
router.put('/:id', protect, eventValidation, updateEvent);
router.delete('/:id', protect, deleteEvent);

module.exports = router;
