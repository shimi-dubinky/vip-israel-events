const express = require('express');
const router = express.Router();
const { authUser } = require('../controllers/userController.js');

// הגדרת נתיב: בקשת POST לכתובת /login תפעיל את הפונקציה authUser
router.post('/login', authUser);

module.exports = router;