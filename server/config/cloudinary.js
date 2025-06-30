const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// הגדרת החיבור ל-Cloudinary עם הפרטים מקובץ ה-.env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// הגדרת "מנוע אחסון" עבור Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'vip_events_gallery', // שם התיקייה ב-Cloudinary שאליה יעלו הקבצים
    allowed_formats: ['jpeg', 'jpg', 'png', 'mp4', 'mov'], // סוגי הקבצים המורשים
    resource_type: 'auto', // Cloudinary יזהה אוטומטית אם זה תמונה או וידאו
  },
});

module.exports = {
  cloudinary,
  storage,
};