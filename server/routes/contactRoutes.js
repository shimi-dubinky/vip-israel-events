const express = require('express');
const router = express.Router();
const { submitContactForm } = require('../controllers/contactController.js');

router.route('/').post(submitContactForm);

module.exports = router;