import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { galleryImages, galleryCategories } from '../../data/galleryData'; 

// אייקונים לחצי הניווט ב-Lightbox
const ChevronLeftIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
  </svg>
);

const ChevronRightIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
  </svg>
);


const GalleryPage = () => {
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredImages = useMemo(() => {
    if (activeFilter === 'all') {
      return galleryImages;
    }
    return galleryImages.filter(img => img.category === activeFilter);
  }, [activeFilter]);

  const selectedImageIndex = filteredImages.findIndex(img => img.id === selectedId);
  
  const navigateImage = (direction) => {
    if (selectedImageIndex === -1) return;
    const newIndex = (selectedImageIndex + direction + filteredImages.length) % filteredImages.length;
    setSelectedId(filteredImages[newIndex].id);
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') navigateImage(1);
    if (e.key === 'ArrowLeft') navigateImage(-1);
    if (e.key === 'Escape') setSelectedId(null);
  };

  return (
    <motion.div
      className="py-24 bg-primary text-lightest-slate"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      onKeyDown={handleKeyDown}
      tabIndex={-1} 
    >
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-center mb-6 font-serif text-gold-highlight">
          {t('gallery_title')}
        </h1>
        <p className="text-lg text-center text-secondary mb-12 max-w-3xl mx-auto">{t('gallery_subtitle')}</p>

        <div className="flex justify-center items-center gap-4 mb-12">
          {galleryCategories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveFilter(cat.key)}
              className={`px-6 py-2 font-medium rounded-full transition-all duration-300 ${activeFilter === cat.key ? 'bg-gold-base text-primary' : 'bg-transparent border border-secondary text-secondary hover:bg-gold-base/20 hover:text-lightest-slate'}`}
            >
              {t(cat.name)}
            </button>
          ))}
        </div>
        
        {/* החלפנו את ה-div עם 'grid' ב-div עם 'columns'.
          - `columns-2 md:columns-3 ...`: מגדיר את מספר הטורים למסכים בגדלים שונים.
          - `gap-4`: הרווח בין הטורים.
          - `space-y-4`: מאפשר רווח אנכי בין התמונות באותו טור.
        */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          <AnimatePresence>
            {filteredImages.map(image => (
              /*
                - הסרנו את הקלאס 'aspect-w-1 aspect-h-1' כדי לאפשר לתמונה גובה טבעי.
                - הוספנו 'break-inside-avoid' כדי למנוע מתמונה בודדת להישבר ולהתחלק בין טורים.
                - האנימציה נשארת זהה ועובדת מצוין גם בפריסה זו.
              */
              <motion.div
                key={image.id}
                className="group overflow-hidden rounded-lg shadow-lg cursor-pointer break-inside-avoid"
                layoutId={`card-image-container-${image.id}`}
                onClick={() => setSelectedId(image.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <img
                  src={image.src}
                  alt={t(image.alt, image.alt)}
                  className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox נשאר ללא שינוי */}
      <AnimatePresence>
        {selectedId && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedId(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button onClick={(e) => { e.stopPropagation(); navigateImage(-1); }} className="absolute left-4 md:left-10 text-white/70 hover:text-white transition-colors z-50">
              <ChevronLeftIcon className="w-10 h-10" />
            </button>
            
            <motion.div
                className="relative max-w-5xl max-h-[90vh] w-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
                layoutId={`card-image-container-${selectedId}`}
            >
                <AnimatePresence mode="wait">
                    <motion.img
                        key={selectedId}
                        src={filteredImages[selectedImageIndex]?.src}
                        alt={t(filteredImages[selectedImageIndex]?.alt)}
                        className="w-auto h-auto object-contain max-h-[90vh] rounded-lg shadow-2xl"
                        initial={{ opacity: 0.5, x: selectedImageIndex > (filteredImages.length / 2) ? 50 : -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0.5, x: selectedImageIndex > (filteredImages.length / 2) ? -50 : 50 }}
                        transition={{ duration: 0.3 }}
                    />
                </AnimatePresence>
            </motion.div>

            <button onClick={(e) => { e.stopPropagation(); navigateImage(1); }} className="absolute right-4 md:right-10 text-white/70 hover:text-white transition-colors z-50">
              <ChevronRightIcon className="w-10 h-10" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default GalleryPage;