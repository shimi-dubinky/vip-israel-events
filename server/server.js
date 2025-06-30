const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = require('./config/db.js');
const User = require('./models/User.js');

// ייבוא כל הראוטים
const userRoutes = require('./routes/userRoutes.js');
const uploadRoutes = require('./routes/uploadRoutes.js');
const galleryRoutes = require('./routes/galleryRoutes.js');
const testimonialRoutes = require('./routes/testimonialRoutes.js');
const contactRoutes = require('./routes/contactRoutes.js'); // <-- ייבוא חדש

const { notFound, errorHandler } = require('./middleware/errorMiddleware.js');

const app = express();
app.use(express.json());
app.use(cors());

// --- הפעלת כל ה-API Endpoints ---
app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/contact', contactRoutes); // <-- הפעלת הראוט החדש

app.get('/', (req, res) => {
  res.send('API for VIP Events is running...');
});

app.use(notFound);
app.use(errorHandler);

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