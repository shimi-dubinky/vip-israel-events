import { Outlet } from 'react-router-dom'; // 1. ייבוא קריטי
import { Header } from './Header';
import Footer from './Footer';
import FloatingWhatsApp from './FloatingWhatsApp';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-primary">
      <Header />
      <main className="flex-grow">
        {/* 2. החלפת {children} ב-Outlet */}
        {/* זה אומר לראוטר "כאן תצייר את העמודים הפנימיים" */}
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default MainLayout;