import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import HomePage from './components/pages/HomePage';
import GalleryPage from './components/pages/GalleryPage';
import ContactPage from './components/pages/ContactPage';
import NotFoundPage from './components/pages/NotFoundPage';
import AdminLoginPage from './components/pages/AdminLoginPage';
import AdminDashboardPage from './components/pages/AdminDashboardPage';
import AdminGalleryPage from './components/admin/AdminGalleryPage';
import AdminTestimonialsPage from './components/admin/AdminTestimonialsPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <Routes>
      {/* נתיבים ציבוריים שמשתמשים בלייאאוט הראשי */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>

      {/* נתיבים של ממשק הניהול */}
      <Route path="/admin" element={<AdminLoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/gallery" element={<AdminGalleryPage />} />
        <Route path="/admin/testimonials" element={<AdminTestimonialsPage />} />
      </Route>
      
      {/* נתיב 404 שתופס את כל מה שלא נמצא */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;