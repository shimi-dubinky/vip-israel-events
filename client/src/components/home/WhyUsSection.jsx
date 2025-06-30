import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import amtHelicopter from '../../assets/images/amt_helicopter.jpg';

export const WhyUsSection = () => {
  const { t } = useTranslation();
  const whyUsPoints = t('why_us_points', { returnObjects: true });

  return (
    <motion.section 
      className="py-24 bg-primary"
      initial={{ opacity: 0 }} 
      whileInView={{ opacity: 1 }} 
      viewport={{ once: true }} 
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={amtHelicopter} 
              alt="Helicopter over Jerusalem" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-white">
            <h2 className="text-4xl md:text-5xl font-bold text-lightest-slate mb-6 font-serif">{t('why_us_title')}</h2>
            <p className="text-secondary text-lg mb-8">{t('why_us_subtitle')}</p>
            <ul className="space-y-4">
              {whyUsPoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className="bg-gold-base text-primary rounded-full flex-shrink-0 w-6 h-6 flex items-center justify-center font-bold mr-4 mt-1">✓</span>
                  <span className="flex-1 text-secondary text-lg">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  );
};