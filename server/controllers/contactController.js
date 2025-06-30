const nodemailer = require('nodemailer');
const twilio = require('twilio');

const submitContactForm = async (req, res) => {
  const { name, email, phone, participants, eventType, startDate, endDate, message } = req.body;

  // =========== התיקון נמצא כאן ===========
  // במקום להשתמש בקיצור הדרך 'gmail', נגדיר את כל הפרטים במפורש
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // השרת של ג'ימייל
    port: 587, // הפורט המומלץ לשליחה מאובטחת
    secure: false, // ההצפנה מתחילה באמצעות STARTTLS
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  // =======================================

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
  
  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');

    try {
      const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
      const whatsappMessageBody = `*פנייה חדשה מאתר VIP Events*\n\n*שם:* ${name}\n*אימייל:* ${email}\n*טלפון:* ${phone || 'לא צוין'}\n*סוג אירוע:* ${eventType || 'לא צוין'}\n*משתתפים:* ${participants || 'לא צוין'}\n*תאריכים:* מ-${startDate || '?'} עד-${endDate || '?'}\n\n*הודעה:* ${message}`;
      await client.messages.create({
         from: process.env.TWILIO_WHATSAPP_NUMBER,
         body: whatsappMessageBody.trim(),
         to: process.env.RECIPIENT_WHATSAPP_NUMBER
       });
       console.log('WhatsApp notification sent successfully');
    } catch (whatsappError) {
      console.error('Failed to send WhatsApp notification:', whatsappError);
    }

    res.status(200).json({ message: 'Contact form submitted successfully!' });

  } catch (emailError) {
    console.error('Error sending email:', emailError);
    return res.status(500).json({ message: 'Error sending email' });
  }
};

module.exports = { submitContactForm };