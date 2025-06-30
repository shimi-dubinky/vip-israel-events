const nodemailer = require('nodemailer');

const submitContactForm = (req, res) => {
  // קבלת כל השדות, כולל החדשים
  const { name, email, phone, participants, eventType, startDate, endDate, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // בניית גוף האימייל עם כל הפרטים החדשים
  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: `פנייה חדשה מטופס יצירת קשר - ${eventType || 'כללי'}`,
    html: `
      <div dir="rtl" style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #D4A574;">פנייה חדשה מאתר VIP Events</h2>
        <p><strong>שם מלא:</strong> ${name}</p>
        <p><strong>אימייל:</strong> ${email}</p>
        ${phone ? `<p><strong>טלפון:</strong> ${phone}</p>` : ''}
        <hr style="border-color: #f0f0f0;">
        <p><strong>סוג אירוע:</strong> ${eventType || 'לא צוין'}</p>
        ${participants ? `<p><strong>כמות משתתפים:</strong> ${participants}</p>` : ''}
        ${startDate ? `<p><strong>תאריכי טיול:</strong> מ-${startDate} עד-${endDate || 'לא צוין'}</p>` : ''}
        <hr style="border-color: #f0f0f0;">
        <p><strong>הודעה:</strong></p>
        <p style="white-space: pre-wrap; background-color: #f9f9f9; border: 1px solid #ddd; padding: 10px; border-radius: 5px;">${message}</p>
      </div>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ message: 'Error sending email' });
    }
    res.status(200).json({ message: 'Email sent successfully!' });
  });
};

module.exports = { submitContactForm };