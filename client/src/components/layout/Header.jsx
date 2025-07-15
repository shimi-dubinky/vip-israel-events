import { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { scroller } from 'react-scroll';
import { useTranslation } from 'react-i18next';

export const Header = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // תפריט מובייל פתוח?
  const [hasScrolled, setHasScrolled] = useState(false); // אם גללנו ≥ 80px?
  const location = useLocation();
  const navigate = useNavigate();

  const changeBackground = () => (window.scrollY >= 80 ? setHasScrolled(true) : setHasScrolled(false));
  useEffect(() => { window.addEventListener('scroll', changeBackground); return () => window.removeEventListener('scroll', changeBackground); }, []);

  const navLinks = [
    { name: t('nav_home'), href: '/', isPage: true },
    { name: t('nav_events'), href: 'events', isPage: false },
    { name: t('nav_testimonials'), href: 'testimonials', isPage: false },
    { name: t('nav_gallery'), href: '/gallery', isPage: true },
    { name: t('nav_contact'), href: '/contact', isPage: true },
  ];

  const handleSmartScroll = (targetId) => {
    setIsMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => scroller.scrollTo(targetId, { duration: 800, smooth: 'easeInOutCubic', offset: -80 }), 100);
    } else {
      scroller.scrollTo(targetId, { duration: 800, smooth: 'easeInOutCubic', offset: -80 });
    }
  };

  const NavLink = ({ link }) => {
    const baseTextColor = hasScrolled ? 'text-secondary' : 'text-lightest-slate';
    const className = `${baseTextColor} font-medium hover:text-gold-base transition-colors cursor-pointer`;
    return link.isPage
      ? <RouterLink to={link.href} className={className} onClick={() => setIsMenuOpen(false)}>{link.name}</RouterLink>
      : <a onClick={() => handleSmartScroll(link.href)} className={className}>{link.name}</a>;
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${hasScrolled ? 'bg-primary/80 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'}`}>
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <RouterLink to="/" className={`text-2xl font-bold transition-colors ${hasScrolled ? 'text-lightest-slate' : 'text-white'} font-serif`}>
          <img src="/images/logo-emt.PNG" alt="E.M.T VIP Logo" className="h-10 w-auto" />
        </RouterLink>

        {/* ניווט דסקטופ */}
        <div className="hidden md:flex items-center">
          <div className="flex gap-x-8">{navLinks.map((lnk) => <NavLink key={lnk.name} link={lnk} />)}</div>
          <div className="flex items-center border-s border-white/20 ms-8 ps-8 space-x-2">
            <button onClick={() => i18n.changeLanguage('en')} className={`font-medium transition-colors ${i18n.language.startsWith('en') ? 'text-gold-base' : 'text-secondary'}`}>EN</button>
            <span className="text-secondary">/</span>
            <button onClick={() => i18n.changeLanguage('he')} className={`font-medium transition-colors ${i18n.language === 'he' ? 'text-gold-base' : 'text-secondary'}`}>HE</button>
          </div>
        </div>

        {/* כפתור המבורגר במובייל */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={hasScrolled ? 'text-lightest-slate' : 'text-gold-base'}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
          </button>
        </div>
      </nav>

      {/* תפריט מובייל */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-0 left-0 w-full h-screen bg-primary/95 backdrop-blur-lg z-40 p-6 flex flex-col">
          <div className="flex justify-end mb-8">
            <button onClick={() => setIsMenuOpen(false)}>
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="flex flex-col items-center justify-center flex-grow space-y-10">
            {navLinks.map((lnk) => <NavLink key={lnk.name} link={lnk} />)}
            <div className="flex items-center pt-8 mt-8 border-t border-white/20 space-x-4">
              <button onClick={() => { i18n.changeLanguage('en'); setIsMenuOpen(false); }} className={`text-xl font-medium transition-colors ${i18n.language.startsWith('en') ? 'text-gold-base' : 'text-secondary'}`}>EN</button>
              <span className="text-secondary">/</span>
              <button onClick={() => { i18n.changeLanguage('he'); setIsMenuOpen(false); }} className={`text-xl font-medium transition-colors ${i18n.language === 'he' ? 'text-gold-base' : 'text-secondary'}`}>HE</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
