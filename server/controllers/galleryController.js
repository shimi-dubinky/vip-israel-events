const GalleryItem = require('../models/GalleryItem.js');
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
    const itemToDelete = await GalleryItem.findById(req.params.id);

    if (itemToDelete) {
      await cloudinary.uploader.destroy(itemToDelete.public_id);      
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
  deleteGalleryItem, 
};