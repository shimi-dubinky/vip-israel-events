import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import Footer from './Footer';
import FloatingWhatsApp from './FloatingWhatsApp';

const MainLayout = () => {
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