// src/components/layout/MainLayout.jsx
import Header from './Header';
import Footer from './Footer'; // The new import

// The old Footer component that was here is now deleted.

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow p-5 container mx-auto">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;