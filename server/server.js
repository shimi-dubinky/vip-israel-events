const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// טעינת משתני סביבה חייבת לקרות לפני כל שאר הייבואים
dotenv.config();

// ייבוא של כל המודולים והראוטים שלנו
const connectDB = require('./config/db.js');
const User = require('./models/User.js');
const userRoutes = require('./routes/userRoutes.js');
const uploadRoutes = require('./routes/uploadRoutes.js');
const galleryRoutes = require('./routes/galleryRoutes.js');
const testimonialRoutes = require('./routes/testimonialRoutes.js');
const contactRoutes = require('./routes/contactRoutes.js');
const { notFound, errorHandler } = require('./middleware/errorMiddleware.js');

// יצירת אפליקציית Express
const app = express();

// הגדרת CORS מפורשת כדי לאשר בקשות רק מהאתר שלנו ב-Vercel
const corsOptions = {
  origin: 'https://vip-israel-events.vercel.app',
  optionsSuccessStatus: 200 
};
app.use(cors(corsOptions));

app.use(express.json()); // מאפשר לשרת לקבל גוף בקשה בפורמט JSON

// הגדרת נקודות הקצה (API Endpoints)
app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/contact', contactRoutes);

// נקודת קצה ראשית לבדיקה
app.get('/', (req, res) => {
  res.send('API for VIP Events is running...');
});

// הפעלת מנהל השגיאות (חייב להיות בסוף)
app.use(notFound);
app.use(errorHandler);

// הגדרת פורט והפעלת השרת
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    await createInitialAdmin();
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};
  
const createInitialAdmin = async () => {
    try {
        const userExists = await User.findOne({ email: process.env.ADMIN_EMAIL });
        if (!userExists) {
            console.log('Initial admin user not found, creating one...');
            const user = new User({
                email: process.env.ADMIN_EMAIL,
                password: process.env.ADMIN_PASSWORD,
            });
            await user.save();
            console.log('Initial admin user has been created successfully!');
        } else {
            console.log('Initial admin user already exists.');
        }
    } catch (error) {
        console.error('Error during initial admin user creation:', error);
    }
};

startServer();