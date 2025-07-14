import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import Footer from './Footer';
import FloatingWhatsApp from './FloatingWhatsApp';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const MainLayout = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.language === 'he' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  return (
    <div className="min-h-screen flex flex-col bg-primary">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default MainLayout;