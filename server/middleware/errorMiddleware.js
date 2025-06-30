/**
 * מידלוור לטיפול בנתיבים שלא נמצאו (404)
 */
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

/**
 * מידלוור כללי לטיפול בכל שאר השגיאות
 * הוא יתפוס כל שגיאה שתיזרק באפליקציה
 */
const errorHandler = (err, req, res, next) => {
  // לפעמים שגיאה מגיעה עם סטטוס 200, אנחנו רוצים לשנות את זה
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // שלח תגובת JSON מסודרת במקום דף HTML
  res.status(statusCode).json({
    message: message,
    // בסביבת פיתוח, נרצה לראות גם את פירוט השגיאה המלא (stack trace)
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = { notFound, errorHandler };