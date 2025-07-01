import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-secondary border-t border-white/10">
      <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center text-center md:text-start">
        
        {/* צד ימין - זכויות יוצרים */}
        <p className="text-sm">
          &copy; {currentYear} {t('site_name')}. {t('footer_rights')}
        </p>
        
        {/* צד שמאל - קרדיט למפתח */}
        <p className="text-sm mt-4 md:mt-0">
          Built with ♥ by <a href="#" className="font-medium text-lightest-slate hover:text-gold-base transition-colors">Shimon Dubinky</a>
        </p>

      </div>
    </footer>
  );
};

export default Footer;