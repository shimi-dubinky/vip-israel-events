import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import Footer from './Footer';
import FloatingContactMenu from './FloatingContactMenu';

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
      <FloatingContactMenu />
    </div>
  );
};

export default MainLayout;