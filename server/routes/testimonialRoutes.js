const express = require('express');
const router = express.Router();
const {
  createTestimonial,
  getTestimonials,
  deleteTestimonial,
} = require('../controllers/testimonialController.js');
const { protect } = require('../middleware/authMiddleware.js');

// נתיב בסיס: GET לכולם, POST רק למנהל
router.route('/').get(getTestimonials).post(protect, createTestimonial);

// נתיב עם ID: DELETE רק למנהל
router.route('/:id').delete(protect, deleteTestimonial);

module.exports = router;