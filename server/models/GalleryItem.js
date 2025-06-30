const mongoose = require('mongoose');

// רשימת המפתחות הניטרליים והתקניים של הקטגוריות
const validCategories = ['celebrations', 'community_events', 'family_trip', 'holidays'];

const galleryItemSchema = mongoose.Schema(
  {
    title: {
      type: String, // שדה הכותרת הוא אופציונלי
    },
    category: {
      type: String,
      required: [true, 'Please specify a category'],
      enum: validCategories // אנו כופים על בסיס הנתונים לקבל רק ערכים מהרשימה הזו
    },
    mediaType: {
      type: String,
      required: true,
      enum: ['image', 'video'],
    },
    mediaUrl: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const GalleryItem = mongoose.model('GalleryItem', galleryItemSchema);
module.exports = GalleryItem;