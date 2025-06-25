// src/components/home/TestimonialsCarousel.jsx
import { motion } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

const TestimonialCard = ({ testimonial }) => (
  <motion.div className="bg-card-bg backdrop-blur-lg border border-white/10 p-8 rounded-2xl shadow-xl w-[380px] md:w-[450px] flex-shrink-0" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
      <blockquote className="h-full flex flex-col">
          <svg className="w-10 h-10 text-accent-gold-deep mb-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.344 3.237a1.5 1.5 0 012.312 0L15.5 7.586a1.5 1.5 0 01-1.156 2.513h-1.018a.75.75 0 00-.75.75v5.043a.75.75 0 00.75.75h1.5a.75.75 0 010 1.5h-1.5a2.25 2.25 0 01-2.25-2.25v-5.043a2.25 2.25 0 012.25-2.25h1.018a.75.75 0 00.578-1.257L10.438 4.3l-.794.793a.75.75 0 01-1.06-1.06l1.75-1.75a.75.75 0 011.06 0L13 3.828a.75.75 0 001.156-.977L11.07 1.437a3 3 0 00-4.624 0L3.29 5.854a.75.75 0 00.578 1.257h1.018a2.25 2.25 0 012.25 2.25v5.043a2.25 2.25 0 01-2.25-2.25h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 00.75-.75V8.5a.75.75 0 00-.75-.75H4.868a1.5 1.5 0 01-1.156-2.513L7.556 1.437a3 3 0 002.312-2.312z" clipRule="evenodd" /></svg>
          <p className="text-lg text-secondary italic leading-relaxed flex-grow">"{testimonial.quote}"</p>
          <footer className="mt-6 flex items-center"><img src={testimonial.avatar} alt={testimonial.author} className="w-14 h-14 rounded-full mr-4 object-cover border-2 border-accent-gold-deep/30"/><div><p className="font-bold text-lightest-slate">{testimonial.author}</p><p className="text-sm text-secondary">{testimonial.origin}</p></div></footer>
      </blockquote>
  </motion.div>
);

export const TestimonialsCarousel = () => {
    const { t } = useTranslation();
    const carouselRef = useRef(null);
    const testimonials = [
        { id: 1, quote: "Working with them was the best decision we made.", author: "The Cohen Family", origin: "New York, NY", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
        { id: 2, quote: "An absolutely magical experience...", author: "Rabbi Shmuel Goldstein", origin: "Congregation Beth Jacob, LA", avatar: "https://randomuser.me/api/portraits/men/51.jpg" },
        { id: 3, quote: "They turned our dream family vacation into a reality...", author: "Sarah & Michael Rosen", origin: "Chicago, IL", avatar: "https://randomuser.me/api/portraits/women/44.jpg" }
    ];

    return (
        <section id="testimonials" className="py-24 bg-primary">
            <div className="container mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16 font-serif">{t('testimonials_title')}</h2>
                <div ref={carouselRef} className="cursor-grab overflow-x-auto">
                    <motion.div className="flex gap-8 px-4" drag="x" dragConstraints={carouselRef}>
                        {testimonials.map((testimonial) => (<TestimonialCard key={testimonial.id} testimonial={testimonial} />))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};