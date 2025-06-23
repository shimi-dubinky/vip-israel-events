// src/components/pages/HomePage.jsx
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const { t } = useTranslation();
  
  const backgroundImageUrl = 'https://images.unsplash.com/photo-1602153521352-e93215589133?q=80&w=1935';
  
  // Data is now pulled from the translation files
  const events = t('events', { returnObjects: true });
  const whyUsPoints = t('why_us_points', { returnObjects: true });

  // Testimonials data remains here for now as it includes images
  const testimonials = [
    { id: 1, quote: "Working with them was the best decision... Flawless execution.", author: "The Cohen Family", origin: "New York, NY", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
    { id: 2, quote: "An absolutely magical experience... Our community felt inspired.", author: "Rabbi Shmuel Goldstein", origin: "Congregation Beth Jacob, LA", avatar: "https://randomuser.me/api/portraits/men/51.jpg" },
    { id: 3, quote: "They turned our dream family vacation into a reality...", author: "Sarah & Michael Rosen", origin: "Chicago, IL", avatar: "https://randomuser.me/api/portraits/women/44.jpg" }
  ];
  
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  return (
    <div>
      {/* ====== Hero Section ====== */}
      <section ref={heroRef} className="relative h-[100vh] min-h-[600px] flex items-center justify-center text-white">
        <div className="absolute inset-0 z-0" style={{ backgroundImage: `url(${backgroundImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}/>
        <div className="absolute inset-0 bg-primary bg-opacity-60 z-10"></div>
        <motion.div className="relative z-20 container mx-auto px-4 text-center" style={{ y: textY }}>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight font-serif">{t('hero_title')}</h1>
          <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto">{t('hero_subtitle')}</p>
          <a href="/contact" className="mt-10 inline-block bg-accent text-primary font-bold py-4 px-10 rounded-lg text-lg hover:bg-opacity-90 transition-all transform hover:scale-105">{t('hero_button')}</a>
        </motion.div>
      </section>

      {/* ====== Featured Events Section ====== */}
      <motion.section id="events" className="py-20 bg-background relative" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 font-serif">{t('events_title')}</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {events.map((event, index) => (
              <div key={index} className="p-6">
                <h3 className="text-2xl font-bold mb-2 font-serif text-primary">{event.title}</h3>
                <p className="text-secondary">{event.description}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>
      
      {/* ====== Why Us Section ====== */}
      <motion.section className="py-20 bg-white relative" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-last md:order-first"><img src="https://images.unsplash.com/photo-1519672198583-e25a1e4559bb?q=80&w=1887" alt="Personalized service" className="rounded-lg shadow-xl"/></div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 font-serif">{t('why_us_title')}</h2>
              <p className="text-secondary mb-8">{t('why_us_subtitle')}</p>
              <ul className="space-y-4">
                {whyUsPoints.map((point, index) => (
                  <li key={index} className="flex items-start">
                    <span className="bg-accent text-primary rounded-full flex-shrink-0 w-6 h-6 flex items-center justify-center font-bold mr-4 mt-1">✓</span>
                    <span className="flex-1 text-secondary">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ====== Testimonials Section ====== */}
      <motion.section id="testimonials" className="py-20 bg-background relative" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 font-serif">{t('testimonials_title')}</h2>
          <div className="space-y-8">
            {testimonials.map((testimonial, index) => (
              <motion.blockquote key={testimonial.id} className="bg-white p-8 rounded-lg shadow-xl max-w-3xl mx-auto" initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.3 }}>
                <svg className="w-10 h-10 text-accent mb-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10.42 2.88a.75.75 0 00-1.06-1.06L4.62 6.56A.75.75 0 004 7.25v5.5a.75.75 0 00.75.75h3.5a.75.75 0 00.75-.75V8.5a.75.75 0 00-.75-.75h-2.5v-.81l4.72-4.72zM15.42 2.88a.75.75 0 00-1.06-1.06L9.62 6.56A.75.75 0 009 7.25v5.5a.75.75 0 00.75.75h3.5a.75.75 0 00.75-.75V8.5a.75.75 0 00-.75-.75h-2.5v-.81l4.72-4.72z" /></svg>
                <p className="text-lg text-secondary italic leading-relaxed">"{testimonial.quote}"</p>
                <footer className="mt-6 flex items-center"><img src={testimonial.avatar} alt={testimonial.author} className="w-14 h-14 rounded-full mr-4 object-cover"/><div><p className="font-bold text-primary">{testimonial.author}</p><p className="text-sm text-secondary">{testimonial.origin}</p></div></footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;