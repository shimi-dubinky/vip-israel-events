import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "yet-another-react-lightbox/styles.css";

const TestimonialCard = ({ testimonial, onMediaClick }) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const isMediaCard = testimonial.mediaType === 'image' || testimonial.mediaType === 'video';
  const isLongText = testimonial.mediaType === 'quote' && testimonial.content.length > 150;

  const handleCardClick = () => {
    if (isMediaCard) {
      onMediaClick();
    }
  };

  return (
    <motion.div 
      className={`relative bg-gradient-to-br from-slate-800/80 to-slate-900/90 backdrop-blur-xl border border-white/20 p-6 md:p-8 rounded-3xl shadow-2xl flex flex-col w-[85vw] max-w-[420px] h-[85vw] max-h-[420px] overflow-hidden group ${isMediaCard ? 'cursor-pointer' : ''}`}
      onClick={handleCardClick}
      whileHover={{ 
        boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.2)",
        borderColor: "rgba(59, 130, 246, 0.3)"
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
      <div className="relative h-full flex flex-col justify-between z-10">
        <div className="flex-grow flex items-center justify-center text-center overflow-auto scrollbar-hide p-1">
          {testimonial.mediaType === 'quote' && (
            <div className="relative">
              <p className={`font-light text-xl leading-8 text-slate-200 transition-all duration-500 ${isLongText && !isExpanded ? 'line-clamp-6' : ''}`}>
                "{testimonial.content}"
              </p>
              {isLongText && (
                <button onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }} className="text-gold-base hover:text-gold-highlight font-semibold mt-2">
                  {isExpanded ? t('read_less') : t('read_more')}
                </button>
              )}
            </div>
          )}
          {isMediaCard && (
            <div className="w-full h-full rounded-2xl overflow-hidden relative">
              <img src={testimonial.thumbnailUrl} alt={testimonial.author} className="w-full h-full object-cover shadow-2xl" />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  {testimonial.mediaType === 'image' ? 
                    <svg className="w-12 h-12 text-white/70" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" /></svg> :
                    <svg className="w-16 h-16 text-white/70" fill="currentColor" viewBox="0 0 20 20"><path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" /></svg>
                  }
              </div>
            </div>
          )}
        </div>
        <footer className="mt-4 flex items-center pt-4 border-t border-white/10 flex-shrink-0">
          <div className="relative"><img src={testimonial.thumbnailUrl} alt={testimonial.author} className="w-14 h-14 rounded-full mr-4 object-cover border-2 border-white/20 shadow-lg"/><div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-500/20" /></div>
          <div><p className="font-semibold text-white text-base tracking-wide">{testimonial.author}</p><p className="text-sm text-slate-400 mt-1">{testimonial.origin}</p></div>
        </footer>
      </div>
    </motion.div>
  );
};

const ChevronLeft = () => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg> );
const ChevronRight = () => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg> );

export const TestimonialsCarousel = () => {
    const { t } = useTranslation();
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/testimonials`);
                setTestimonials(data);
            } catch (error) {
                console.error("Failed to fetch testimonials", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTestimonials();
    }, []);

    const mediaTestimonials = useMemo(() => testimonials.filter(t => t.mediaType === 'image' || t.mediaType === 'video'), [testimonials]);

    const lightboxSlides = useMemo(() => mediaTestimonials.map(t => {
      if (t.mediaType === 'video') {
        return { type: 'video', sources: [{ src: t.content, type: 'video/mp4' }], width: 1920, height: 1080 };
      }
      return { src: t.content };
    }), [mediaTestimonials]);

    const openLightbox = (testimonialId) => {
        const mediaIndex = mediaTestimonials.findIndex(t => t._id === testimonialId);
        if (mediaIndex > -1) {
            setLightboxIndex(mediaIndex);
            setLightboxOpen(true);
        }
    };

    if (loading) { return ( <section id="testimonials" className="py-32 bg-primary"><div className="container mx-auto px-4"><div className="flex justify-center items-center min-h-[400px]"><div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gold-base"></div></div></div></section> ); }
    if (testimonials.length === 0) return null;

    return (
        <>
            <section id="testimonials" className="py-32 bg-primary overflow-hidden">
                 <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-700 via-primary to-primary"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div className="text-center mb-20" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                        <h2 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-300 to-white mb-6 font-serif leading-tight">{t('testimonials_title')}</h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-gold-base to-gold-shadow mx-auto rounded-full"></div>
                    </motion.div>
                    
                    <div className="relative max-w-7xl mx-auto">
                        <Swiper
                            modules={[Navigation, Pagination, A11y]}
                            spaceBetween={30}
                            slidesPerView={'auto'}
                            centeredSlides={true}
                            loop={testimonials.length > 2}
                            pagination={{ clickable: true, el: '.swiper-pagination-custom' }}
                            navigation={{ nextEl: '.swiper-button-next-custom', prevEl: '.swiper-button-prev-custom' }}
                            className="!pb-16" >
                            {testimonials.map((testimonial) => (
                                <SwiperSlide key={testimonial._id} className="h-auto !w-auto">
                                    <TestimonialCard testimonial={testimonial} onMediaClick={() => openLightbox(testimonial._id)} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className="swiper-button-prev-custom absolute top-1/2 -left-4 md:-left-8 transform -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-all cursor-pointer"><ChevronLeft /></div>
                        <div className="swiper-button-next-custom absolute top-1/2 -right-4 md:-right-8 transform -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-all cursor-pointer"><ChevronRight /></div>
                        <div className="swiper-pagination-custom text-center mt-8"></div>
                    </div>
                </div>
            </section>

            <Lightbox
                open={lightboxOpen}
                close={() => setLightboxOpen(false)}
                index={lightboxIndex}
                slides={lightboxSlides}
                plugins={[Video]}
            />
        </>
    );
};