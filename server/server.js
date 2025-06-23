// File: server/server.js

const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/api/contact', (req, res) => {
  const { name, email, phone, message } = req.body;

  // 1. Create a transporter object using Gmail SMTP
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail address from .env file
      pass: process.env.EMAIL_PASS, // Your App Password from .env file
    },
  });

  // 2. Define the email options
  const mailOptions = {
    from: `"${name}" <${email}>`, // Sender address (shows the user's name and email)
    to: process.env.EMAIL_USER, // Receiver address (your email, where you'll get the notifications)
    subject: `New Contact Form Submission from M.L.T VIP`,
    html: `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  };

  // 3. Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ message: 'Error sending email' });
    }
    console.log('Email sent:', info.response);
    res.status(200).json({ message: 'Email sent successfully!' });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});