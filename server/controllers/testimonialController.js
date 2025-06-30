const Testimonial = require('../models/Testimonial.js');
const { cloudinary } = require('../config/cloudinary.js');

/**
 * @desc    יצירת המלצה חדשה
 * @route   POST /api/testimonials
 * @access  Private
 */
const createTestimonial = async (req, res) => {
  const { 
    author, 
    origin, 
    mediaType, 
    content, 
    thumbnailUrl, 
    content_public_id, 
    thumbnail_public_id 
  } = req.body;

  try {
    const testimonial = new Testimonial({
      author,
      origin,
      mediaType,
      content,
      thumbnailUrl,
      content_public_id,
      thumbnail_public_id,
    });

    const createdTestimonial = await testimonial.save();
    res.status(201).json(createdTestimonial);
  } catch (error) {
    res.status(400).json({ message: 'Invalid testimonial data', error: error.message });
  }
};

/**
 * @desc    קבלת כל ההמלצות
 * @route   GET /api/testimonials
 * @access  Public
 */
const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({}).sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * @desc    מחיקת המלצה
 * @route   DELETE /api/testimonials/:id
 * @access  Private
 */
const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (testimonial) {
      // אם ההמלצה היא תמונה או וידאו, נמחק גם את קובץ התוכן
      if (testimonial.content_public_id) {
        await cloudinary.uploader.destroy(testimonial.content_public_id);
      }
      // נמחק תמיד את תמונת הפרופיל (thumbnail)
      await cloudinary.uploader.destroy(testimonial.thumbnail_public_id);
      
      // לבסוף, נמחק את הרשומה מה-DB
      await Testimonial.deleteOne({ _id: req.params.id });
      
      res.json({ message: 'Testimonial removed' });
    } else {
      res.status(404).json({ message: 'Testimonial not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  createTestimonial,
  getTestimonials,
  deleteTestimonial,
};