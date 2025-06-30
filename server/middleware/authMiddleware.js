const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

const protect = async (req, res, next) => {
  let token;

  // הבקשות המאובטחות יגיעו עם כותרת 'Authorization' שנראית כך: 'Bearer [TOKEN]'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 1. קח את הטוקן מהכותרת (הסר את המילה 'Bearer')
      token = req.headers.authorization.split(' ')[1];

      // 2. ודא שהטוקן תקף באמצעות המפתח הסודי שלנו
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. מצא את המשתמש ב-DB לפי המזהה ששמור בטוקן
      // וצרף את אובייקט המשתמש (ללא הסיסמה) לבקשה עצמה
      req.user = await User.findById(decoded.id).select('-password');

      // 4. אם הכל תקין, המשך לפעולה הבאה (לקונטרולר)
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };