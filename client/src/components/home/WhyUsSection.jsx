import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { BookOpen, Target, ShieldCheck, Award } from 'lucide-react';

// רכיב קטן לכרטיס שיטה
const MethodCard = ({ icon, title, description, index }) => (
    <motion.div 
        className="bg-slate-800/50 p-6 rounded-lg text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
    >
        <div className="flex justify-center mb-4">
            <div className="bg-gold-base/10 p-3 rounded-full">
                {icon}
            </div>
        </div>
        <h3 className="text-xl font-bold text-gold-base mb-2 font-serif">{title}</h3>
        <p className="text-secondary">{description}</p>
    </motion.div>
);

export const WhyUsSection = () => {
  const { t } = useTranslation();
  const methodSteps = t('why_us_method_steps', { returnObjects: true });
  const promisePoints = t('why_us_promise_points', { returnObjects: true });
  const methodIcons = [
    <BookOpen size={28} className="text-gold-highlight" />,
    <Target size={28} className="text-gold-highlight" />,
    <ShieldCheck size={28} className="text-gold-highlight" />,
    <Award size={28} className="text-gold-highlight" />
  ];

  return (
    <section id="why-us" className="py-24 bg-primary text-lightest-slate">
      <div className="container mx-auto px-4 space-y-24">
        
        {/* כותרת ראשית */}
        <motion.div className="text-center max-w-3xl mx-auto" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
            <h2 className="text-4xl md:text-5xl font-bold text-lightest-slate mb-6 font-serif">{t('why_us_main_title')}</h2>
            <p className="text-secondary text-lg">{t('why_us_main_subtitle')}</p>
        </motion.div>

        {/* הפילוסופיה שלנו */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                <h3 className="text-3xl font-bold text-gold-base mb-4 font-serif">{t('why_us_philosophy_title')}</h3>
                <p className="text-secondary leading-relaxed whitespace-pre-line">{t('why_us_philosophy_text')}</p>
            </motion.div>
            <motion.div className="h-80 bg-slate-800/50 rounded-lg flex items-center justify-center" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
                <p className="text-secondary italic">"אזור עיצובי לספר / תמונה"</p>
            </motion.div>
        </div>

        {/* השיטה שלנו */}
        <div>
            <motion.h3 className="text-3xl font-bold text-gold-base mb-10 font-serif text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>{t('why_us_method_title')}</motion.h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {methodSteps.map((step, index) => (
                    <MethodCard key={index} icon={methodIcons[index]} title={step.title} description={step.description} index={index} />
                ))}
            </div>
        </div>

        {/* הסגירה האישית */}
        <motion.div className="text-center max-w-2xl mx-auto" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
            <h3 className="text-3xl font-bold text-gold-base mb-4 font-serif">{t('why_us_promise_title')}</h3>
            <div className="flex justify-center gap-x-8 mb-8">
                {promisePoints.map((point, index) => (
                    <span key={index} className="text-secondary text-lg">{point}</span>
                ))}
            </div>
            <p className="text-lg text-lightest-slate">{t('why_us_closing_text')}</p>
            <img src="/images/signature.png" alt="Signature" className="mx-auto my-4 h-20 w-auto invert brightness-0 filter" />
            <p className="font-bold text-lightest-slate">{t('why_us_closing_name')}</p>
            <p className="text-secondary">{t('why_us_closing_title')}</p>
        </motion.div>

      </div>
    </section>
  );
};