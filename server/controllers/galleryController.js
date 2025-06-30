const GalleryItem = require('../models/GalleryItem.js');
// נייבא את אובייקט cloudinary כדי שנוכל להשתמש ב-API שלו למחיקה
const { cloudinary } = require('../config/cloudinary.js');

/**
 * @desc    יצירת פריט גלריה חדש
 * @route   POST /api/gallery
 * @access  Private
 */
const createGalleryItem = async (req, res) => {
  const { title, category, mediaType, mediaUrl, public_id } = req.body;
  try {
    const galleryItem = new GalleryItem({
      title, category, mediaType, mediaUrl, public_id,
    });
    const createdItem = await galleryItem.save();
    res.status(201).json(createdItem);
  } catch (error) {
    res.status(400).json({ message: 'Invalid gallery item data', error: error.message });
  }
};

/**
 * @desc    קבלת כל פריטי הגלריה
 * @route   GET /api/gallery
 * @access  Public
 */
const getGalleryItems = async (req, res) => {
  try {
    const items = await GalleryItem.find({}).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * @desc    מחיקת פריט גלריה
 * @route   DELETE /api/gallery/:id
 * @access  Private
 */
const deleteGalleryItem = async (req, res) => {
  try {
    // 1. מצא את הפריט ב-DB לפי המזהה שהתקבל בכתובת
    const itemToDelete = await GalleryItem.findById(req.params.id);

    if (itemToDelete) {
      // 2. אם הפריט קיים, השתמש ב-public_id שלו כדי למחוק את הקובץ מ-Cloudinary
      // 'destroy' היא פקודת המחיקה ב-API של Cloudinary
      await cloudinary.uploader.destroy(itemToDelete.public_id);
      
      // 3. לאחר שהקובץ נמחק מהענן, מחק את הרשומה מבסיס הנתונים
      await GalleryItem.deleteOne({ _id: req.params.id });
      
      res.json({ message: 'Gallery item removed' });
    } else {
      res.status(404).json({ message: 'Gallery item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


module.exports = {
  createGalleryItem,
  getGalleryItems,
  deleteGalleryItem, // <-- הוספת הפונקציה החדשה לייצוא
};