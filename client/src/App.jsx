import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import HomePage from './components/pages/HomePage';
import GalleryPage from './components/pages/GalleryPage';
import ContactPage from './components/pages/ContactPage';
import NotFoundPage from './components/pages/NotFoundPage';

// אזור הניהול
import AdminLoginPage from './components/pages/AdminLoginPage';
import AdminDashboardPage from './components/pages/AdminDashboardPage';
import AdminGalleryPage from './components/admin/AdminGalleryPage';
import AdminTestimonialsPage from './components/admin/AdminTestimonialsPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <Routes>
      {/* ===== נתיבים ציבוריים (עם תפריט ופוטר) ===== */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>

      {/* ===== נתיבים של ממשק הניהול (בלי תפריט ופוטר) ===== */}
      
      {/* דף ההתחברות הוא ציבורי אבל שייך לאזור הניהול */}
      <Route path="/admin" element={<AdminLoginPage />} />
      
      {/* כל הנתיבים הבאים מוגנים על ידי "שומר הראש" */}
      <Route element={<ProtectedRoute />}>
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/gallery" element={<AdminGalleryPage />} />
        <Route path="/admin/testimonials" element={<AdminTestimonialsPage />} />
      </Route>
      
      {/* נתיב "תפוס הכל" (Catch-all) ל-404. חייב להיות אחרון! */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;