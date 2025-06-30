import { Header } from './Header';
import Footer from './Footer';
import FloatingWhatsApp from './FloatingWhatsApp'; 

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-primary">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <FloatingWhatsApp /> 
    </div>
  );
};

export default MainLayout;