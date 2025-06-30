const jwt = require('jsonwebtoken');

/**
 * פונקציה שמקבלת מזהה משתמש (ID) ומייצרת אסימון JWT
 * @param {string} id - המזהה הייחודי של המשתמש מבסיס הנתונים
 * @returns {string} - אסימון ה-JWT שנוצר
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // האסימון יהיה תקף ל-30 יום
  });
};

module.exports = generateToken;