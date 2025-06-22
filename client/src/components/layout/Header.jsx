// src/components/layout/Header.jsx
import { Link } from 'react-router-dom'; // Import Link

const Header = () => {
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Our Events', href: '/events' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div>
          {/* Use Link instead of a */}
          <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-blue-600">
            VIP Israel Events
          </Link>
        </div>
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            // Use Link instead of a
            <Link key={link.name} to={link.href} className="text-gray-600 font-medium hover:text-blue-600 transition-colors">
              {link.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;