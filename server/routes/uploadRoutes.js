const express = require('express');
const multer = require('multer');
const { storage } = require('../config/cloudinary.js');

const router = express.Router();

const upload = multer({ storage });

router.post('/', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: 'No file uploaded.' });
  }
  
  res.status(200).send({
    message: 'File uploaded successfully',
    url: req.file.path,
    public_id: req.file.filename
  });
});

module.exports = router;