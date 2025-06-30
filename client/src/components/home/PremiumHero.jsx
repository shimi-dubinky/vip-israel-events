import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import heroVideo from '../../assets/videos/hero-video.mp4';

export const PremiumHero = () => {
  const { t } = useTranslation();
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden text-white">
      <video autoPlay loop muted playsInline className="absolute z-0 w-auto min-w-full min-h-full max-w-none opacity-20"><source src={heroVideo} type="video/mp4" /></video>
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent z-10"></div>
      <motion.div className="relative z-20 container mx-auto px-4 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
        
        <h1 
          className="text-5xl md:text-8xl font-bold font-serif leading-tight bg-gradient-to-br from-gold-highlight via-gold-base to-gold-shadow bg-clip-text text-transparent" 
          style={{ textShadow: '1px 1px 2px rgba(160, 82, 45, 0.4)' }}
        >
          {t('hero_title')}
        </h1>

        <motion.p 
          className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-lightest-slate" 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 1, delay: 0.5 }}
        >
          {t('hero_subtitle')}
        </motion.p>
        
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          transition={{ duration: 0.5, delay: 1 }}
        >
          <Link 
            to="/contact" 
            className="mt-10 inline-block bg-gradient-to-br from-gold-base via-gold-shadow to-gold-dark-details text-white font-bold py-4 px-10 rounded-lg text-lg shadow-xl shadow-gold-shadow/30 border border-gold-highlight/50 hover:shadow-2xl hover:shadow-gold-base/40 transition-all transform hover:scale-105" 
          >
            {t('hero_button')}
          </Link>
        </motion.div>

      </motion.div>
    </section>
  );
};