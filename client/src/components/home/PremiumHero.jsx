import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const PremiumHero = () => {
  const { t } = useTranslation();
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden text-lightest-slate">
      <video autoPlay loop muted playsInline onLoadedData={() => setIsLoaded(true)} className="absolute z-0 w-auto min-w-full min-h-full max-w-none opacity-80">
        <source src="https://res.cloudinary.com/dke2qedzq/video/upload/q_auto:good,f_auto/v1752059132/hero-video_tof0qj.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent z-10" />

      {/* תוכן */}
      <motion.div className="relative z-20 container mx-auto px-4 text-center" initial={{ opacity: 0 }} animate={{ opacity: isLoaded ? 1 : 0 }} transition={{ duration: 1.5 }}>
        <h1 className="text-4xl sm:text-5xl md:text-8xl font-bold font-serif leading-tight text-gold-base">{t('hero_title')}</h1>
        <motion.p className="mt-6 text-base md:text-xl max-w-3xl mx-auto" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
          {t('hero_subtitle')}
        </motion.p>
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1 }}>
          <Link to="/contact" className="mt-8 md:mt-10 inline-block bg-transparent border-2 border-gold-base text-gold-base font-bold py-3 px-8 md:py-4 md:px-10 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 hover:bg-primary/15 hover:shadow-lg hover:shadow-gold-base/20">
            {t('hero_button')}
          </Link>
        </motion.div>
      </motion.div>

      {/* גל אורגני כפול */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-[120px] transition-all duration-700 ease-out">
          <defs>
            <linearGradient id="organicGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity=".95" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity=".95" />
            </linearGradient>
          </defs>
          <motion.path d="M0,20 C150,100 350,0 500,60 C650,120 850,40 1000,80 C1100,100 1150,60 1200,80 L1200,120 L0,120 Z" fill="url(#organicGradient)" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 2, delay: 1.5, ease: 'easeInOut' }} />
          <motion.path d="M0,40 C200,80 400,20 600,50 C800,80 1000,30 1200,60 L1200,120 L0,120 Z" fill="#ffffff" opacity=".7" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 2.5, delay: 2, ease: 'easeInOut' }} />
        </svg>
      </div>

      {/* נקודות זהב צפות */}
      <motion.div className="absolute -bottom-6 left-1/4 w-8 h-8 bg-gold-base/30 rounded-full blur-sm" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 2.5 }} />
      <motion.div className="absolute -bottom-4 right-1/3 w-12 h-12 bg-gold-base/20 rounded-full blur-md" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 3 }} />
    </section>
  );
};
