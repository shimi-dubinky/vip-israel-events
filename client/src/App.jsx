// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import HomePage from './components/pages/HomePage';
import EventsPage from './components/pages/EventsPage';
import TestimonialsPage from './components/pages/TestimonialsPage';
import GalleryPage from './components/pages/GalleryPage';
import ContactPage from './components/pages/ContactPage';


function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/gallery" element={<GalleryPage />} /> {/* The new route */}
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </MainLayout>
  );
}

export default App;