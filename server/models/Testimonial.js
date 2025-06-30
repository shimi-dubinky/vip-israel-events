const mongoose = require('mongoose');

const testimonialSchema = mongoose.Schema(
  {
    author: { // שם הממליץ
      type: String,
      required: [true, "Please add the author's name"],
    },
    origin: { // לדוגמה: "משפחת כהן, ניו יורק"
      type: String,
    },
    mediaType: { // סוג ההמלצה
      type: String,
      required: true,
      enum: ['quote', 'image', 'video'], // ציטוט טקסט, תמונת מכתב, או וידאו
    },
    content: { // שדה זה יכיל את הציטוט עצמו, או כתובת לתמונה/וידאו
      type: String,
      required: true,
    },
    thumbnailUrl: { // תמונת הפרופיל של הממליץ - תמיד חובה, לשמירה על אחידות
      type: String,
      required: [true, 'Please provide a thumbnail image URL'],
    },
   
    content_public_id: { // מזהה של קובץ התוכן (אם הוא תמונה/וידאו)
      type: String,
    },
    thumbnail_public_id: { // מזהה של תמונת הפרופיל
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Testimonial = mongoose.model('Testimonial', testimonialSchema);
module.exports = Testimonial;