// src/components/layout/Header.jsx
import { useState, useEffect } from 'react';
// Renaming imports to avoid conflicts, a very good practice!
import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  // This function will run on every scroll event
  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setHasScrolled(true);
    } else {
      setHasScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', changeBackground);
    // Cleanup the event listener when the component is removed
    return () => {
      window.removeEventListener('scroll', changeBackground);
    };
  }, []);

  // Navigation links data, now using the 't' function for translation
  const navLinks = [
    { name: t('nav_home'), href: '/', isPage: true },
    { name: t('nav_events'), href: 'events', isPage: false },
    { name: t('nav_testimonials'), href: 'testimonials', isPage: false },
    { name: t('nav_gallery'), href: '/gallery', isPage: true },
    { name: t('nav_contact'), href: '/contact', isPage: true },
  ];

  // Helper component for smart navigation links
  const NavLink = ({ href, children, isPage, onClick, className: extraClassName = '' }) => {
    const baseTextColor = hasScrolled ? 'text-secondary' : 'text-white';
    const hoverColor = hasScrolled ? 'hover:text-accent' : 'hover:text-gray-200';
    const className = `${baseTextColor} font-medium ${hoverColor} transition-colors cursor-pointer ${extraClassName}`;

    if (isPage) {
      return <RouterLink to={href} className={className} onClick={onClick}>{children}</RouterLink>;
    }
    return (
      <ScrollLink
        to={href}
        spy={true}
        smooth={true}
        offset={-80}
        duration={500}
        className={className}
        onClick={onClick}
      >
        {children}
      </ScrollLink>
    );
  };

  return (
    <header className={`sticky top-0 z-30 transition-all duration-300 ${hasScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Site Logo/Name */}
        <div>
          <RouterLink to="/" className={`text-2xl font-bold transition-colors ${hasScrolled ? 'text-primary' : 'text-white'} font-serif`}>
            {t('site_name')}
          </RouterLink>
        </div>

        {/* Desktop Menu & Language Switcher */}
        <div className="hidden md:flex items-center">
          <div className="flex gap-x-8">
            {navLinks.map((link) => (
              <NavLink key={link.name} href={link.href} isPage={link.isPage}>{link.name}</NavLink>
            ))}
          </div>
          <div className='flex items-center border-s ms-8 ps-8 space-x-2 border-gray-500/30'>
             <button onClick={() => i18n.changeLanguage('en')} className={`font-medium transition-colors ${i18n.language.startsWith('en') ? 'text-accent' : (hasScrolled ? 'text-primary' : 'text-white')}`}>EN</button>
             <span className={hasScrolled ? 'text-primary' : 'text-white'}>/</span>
             <button onClick={() => i18n.changeLanguage('he')} className={`font-medium transition-colors ${i18n.language === 'he' ? 'text-accent' : (hasScrolled ? 'text-primary' : 'text-white')}`}>HE</button>
          </div>
        </div>
        
        {/* Mobile Menu Button (Hamburger) */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={hasScrolled ? 'text-primary' : 'text-white'}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu (Drawer) */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-0 left-0 w-full h-screen bg-white z-20 p-6 flex flex-col">
           <div className="flex justify-end mb-8">
              <button onClick={() => setIsMenuOpen(false)}>
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
           </div>
          <div className="flex flex-col items-center justify-center flex-grow space-y-10">
            {navLinks.map((link) => (
              <NavLink 
                key={link.name} 
                href={link.href} 
                isPage={link.isPage}
                onClick={() => setIsMenuOpen(false)}
                className="text-3xl !text-primary" // Override text color for mobile menu
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;