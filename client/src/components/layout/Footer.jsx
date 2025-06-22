// src/components/layout/Footer.jsx

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center">
        <p>&copy; {currentYear} VIP Israel Events. All Rights Reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          {/* בעתיד נוסיף פה קישורים אמיתיים */}
          <a href="#" className="hover:text-white transition-colors">Facebook</a>
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
          <a href="#" className="hover:text-white transition-colors">WhatsApp</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;