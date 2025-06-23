// src/components/layout/Header.jsx
import { useState, useEffect } from 'react'; // Import useEffect
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false); // New state to track scroll

  // This function will run on every scroll event
  const changeBackground = () => {
    if (window.scrollY >= 80) { // If scrolled more than 80px
      setHasScrolled(true);
    } else {
      setHasScrolled(false);
    }
  };

  // This hook adds an event listener when the component loads
  useEffect(() => {
    window.addEventListener('scroll', changeBackground);
    // This cleans up the event listener when the component is removed
    return () => {
      window.removeEventListener('scroll', changeBackground);
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '/', isPage: true },
    { name: 'Our Events', href: '/#events', isPage: false },
    { name: 'Testimonials', href: '/#testimonials', isPage: false },
    { name: 'Gallery', href: '/gallery', isPage: true },
    { name: 'Contact Us', href: '/contact', isPage: true },
  ];

  // A small component to handle link colors
  const NavLink = ({ href, children, isPage, onClick }) => {
    const textColor = hasScrolled ? 'text-gray-600' : 'text-white';
    const hoverColor = hasScrolled ? 'hover:text-primary' : 'hover:text-gray-200';
    
    if (isPage) {
      return <Link to={href} className={`${textColor} font-medium ${hoverColor} transition-colors`} onClick={onClick}>{children}</Link>;
    }
    return <a href={href} className={`${textColor} font-medium ${hoverColor} transition-colors`} onClick={onClick}>{children}</a>;
  };

  return (
    // Conditionally apply classes based on the hasScrolled state
    <header className={`sticky top-0 z-30 transition-all duration-300 ${hasScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div>
          <Link to="/" className={`text-2xl font-bold transition-colors ${hasScrolled ? 'text-primary' : 'text-white'} font-serif`}>
            M.L.T VIP
          </Link>
        </div>
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <NavLink key={link.name} href={link.href} isPage={link.isPage}>{link.name}</NavLink>
          ))}
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={hasScrolled ? 'text-primary' : 'text-white'}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden absolute top-0 left-0 w-full h-screen bg-white z-10 p-6">
           <div className="flex justify-end mb-8"><button onClick={() => setIsMenuOpen(false)}><svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div>
          <div className="flex flex-col items-center space-y-8">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.href} className="text-2xl text-primary font-semibold" onClick={() => setIsMenuOpen(false)}>{link.name}</Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;