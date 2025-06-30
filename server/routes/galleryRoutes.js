const express = require('express');
const router = express.Router();
const {
  createGalleryItem,
  getGalleryItems,
  deleteGalleryItem, // <-- ייבוא הפונקציה החדשה
} = require('../controllers/galleryController.js');
const { protect } = require('../middleware/authMiddleware.js');

// נתיב בסיס: GET לכולם, POST רק למנהל
router.route('/').get(getGalleryItems).post(protect, createGalleryItem);

// נתיב עם ID: DELETE רק למנהל
// ה- id: הוא פרמטר דינמי שנקבל בכתובת
router.route('/:id').delete(protect, deleteGalleryItem); // <-- הוספת הראוט החדש

module.exports = router;