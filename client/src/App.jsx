import { Routes, Route, useLocation } from 'react-router-dom';
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
import AdminProtectedRoute from './components/admin/AdminProtectedRoute';

import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

function App() {
  const { i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.dir(i18n.language);
  }, [i18n, i18n.language]);

  const isAdminRoute = location.pathname.startsWith('/admin');

  // נתיבים של ממשק הניהול (מוצגים ללא הלייאאוט הראשי)
  if (isAdminRoute) {
    return (
      <Routes>
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route element={<AdminProtectedRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/gallery" element={<AdminGalleryPage />} />
          <Route path="/admin/testimonials" element={<AdminTestimonialsPage />} />
        </Route>
        {/* נתיב 404 לאזור הניהול */}
        <Route path="/admin/*" element={<NotFoundPage />} />
      </Routes>
    );
  }

  // נתיבים ציבוריים (מוצגים עם הלייאאוט הראשי)
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* נתיב "תפוס הכל" (Catch-all) ל-404. חייב להיות אחרון! */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </MainLayout>
  );
}

export default App;