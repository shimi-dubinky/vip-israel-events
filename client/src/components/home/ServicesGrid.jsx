import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../data/categories';

// נניח שיש תמונות מתאימות בתיקיית assets
import celebrationsImg from '../../assets/images/image3.jpg'; // דוגמה
import communityImg from '../../assets/images/image1.jpg'; // דוגמה
import familyTripImg from '../../assets/images/amt_helicopter.jpg'; // דוגמה
import holidaysImg from '../../assets/images/kotel_bg.jpg'; // דוגמה

const categoryImages = {
  celebrations: celebrationsImg,
  community_events: communityImg,
  family_trip: familyTripImg,
  holidays: holidaysImg,
};

const ServiceCard = ({ category, index }) => {
  const { t } = useTranslation();
  
  return (
    <motion.div
      className="relative rounded-xl overflow-hidden group h-80 shadow-lg"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
    >
      <img src={categoryImages[category.key]} alt={t(category.titleKey)} className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      
     
      <div className="relative h-full flex flex-col justify-end p-6 md:p-8 text-center md:text-start">
        <h3 className="text-2xl md:text-3xl font-bold text-white font-serif">{t(category.titleKey)}</h3>
        <p className="mt-2 text-white/80 text-sm leading-relaxed line-clamp-3">{t(category.descriptionKey)}</p>
        <Link 
          to="/gallery" 
          state={{ filter: category.key }}
          className="mt-4 inline-block text-gold-base font-semibold hover:text-gold-highlight transition-colors self-center md:self-start"
        >
          {t('view_gallery')} &rarr;
        </Link>
      </div>
    </motion.div>
  );
};

export const ServicesGrid = () => {
  const { t } = useTranslation();
  return (
    <section id="events" className="py-24 bg-primary">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
    
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-300 to-white mb-4 font-serif">{t('services_title')}</h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto">{t('services_subtitle')}</p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {CATEGORIES.map((cat, index) => (
            <ServiceCard key={cat.key} category={cat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};