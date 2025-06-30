const mongoose = require('mongoose');

/**
 * פונקציה אסינכרונית שמנסה להתחבר לבסיס הנתונים של MongoDB
 * באמצעות מחרוזת החיבור שנמצאת בקובץ .env
 */
const connectDB = async () => {
  try {
    // נסיון התחברות
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // אם הגענו לשורה הזו, החיבור הצליח
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
  } catch (error) {
    // אם היינו כאן, החיבור נכשל.
    // הדפסת הודעת השגיאה המפורטת ויציאה מהתהליך
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // יציאה עם קוד 1 מסמלת יציאה עקב שגיאה
  }
};

module.exports = connectDB; // ייצוא הפונקציה כדי שנוכל להשתמש בה בקבצים אחרים