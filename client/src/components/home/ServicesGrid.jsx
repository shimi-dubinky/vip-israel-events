// src/components/home/ServicesGrid.jsx
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';
import cardBgImage from '../../assets/images/image1.jpg';

export const ServicesGrid = () => {
    const { t } = useTranslation();
    const services = t('events', { returnObjects: true });

    return (
        <section className="py-24 bg-primary">
            <div className="container mx-auto px-6">
                <motion.h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white font-serif" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                    {t('events_title')}
                </motion.h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div key={index} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.2 }} viewport={{ once: true }}>
                            <Link to="/gallery" className="block relative group bg-card-bg backdrop-blur-lg border border-white/10 rounded-2xl p-8 h-full hover:border-accent-gold-deep/50 transition-all duration-300 transform hover:-translate-y-2">
                                <div className="absolute inset-0 rounded-2xl bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity" style={{ backgroundImage: `url(${cardBgImage})` }}></div>
                                <div className="relative">
                                    <h3 className="text-2xl font-bold text-lightest-slate mb-4 font-serif">{service.title}</h3>
                                    <p className="text-secondary leading-relaxed">{service.description}</p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};