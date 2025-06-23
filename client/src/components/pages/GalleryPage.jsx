// src/components/pages/GalleryPage.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// שלב א': ייבוא התמונות המקומיות מהתיקייה שיצרנו
// ודא שהשמות והסיומות של הקבצים תואמים למה ששמרת
import image1 from '../../assets/images/image1.jpg'; 
import image2 from '../../assets/images/image2.jpg';
import image3 from '../../assets/images/image3.jpg';

const GalleryPage = () => {
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = useState(null);

  // שלב ב': שימוש במשתני התמונות שיצרנו במערך הנתונים
  const images = [
    { id: 1, src: image1, alt: 'Description for image 1' },
    { id: 2, src: image2, alt: 'Description for image 2' },
    { id: 3, src: image3, alt: 'Description for image 3' },
    // אתה יכול להוסיף עוד תמונות כאן אחרי שייבאת אותן למעלה
  ];

  const selectedImage = images.find(img => img.id === selectedId);

  return (
    <motion.div
      className="py-12 bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-primary font-serif">
          {t('gallery_title')}
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map(image => (
            <motion.div 
              key={image.id} 
              className="group overflow-hidden rounded-lg shadow-lg aspect-w-1 aspect-h-1 cursor-pointer"
              layoutId={`card-image-container-${image.id}`}
              onClick={() => setSelectedId(image.id)}
            >
              <motion.img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* החלון הקופץ שמוצג כשבוחרים תמונה (Lightbox/Modal) */}
      <AnimatePresence>
        {selectedId && selectedImage && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedId(null)} // סגירה בלחיצה על הרקע
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* קונטיינר התמונה הגדולה */}
            <motion.div 
              className="relative max-w-4xl max-h-[90vh] w-full"
              layoutId={`card-image-container-${selectedId}`} // זהה ל-layoutId של התמונה הקטנה
              onClick={(e) => e.stopPropagation()} // מונע סגירה בלחיצה על התמונה עצמה
            >
              <motion.img 
                src={selectedImage.src} 
                alt={selectedImage.alt}
                className="w-full h-auto object-contain max-h-[90vh] rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default GalleryPage;