import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import axios from '../../api/axios';
import { useLocation } from 'react-router-dom';
import { CATEGORIES } from '../../data/categories';

const ChevronLeftIcon = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg> );
const ChevronRightIcon = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg> );

const GalleryPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  
  const [selectedId, setSelectedId] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/gallery');
        setGalleryItems(data);
        setError('');
      } catch (error) {
        console.error("Failed to fetch gallery items", error);
        setError('לא ניתן היה לטעון את פריטי הגלריה. נסו שוב מאוחר יותר.');
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  useEffect(() => {
    const filterFromState = location.state?.filter;
    if (filterFromState && CATEGORIES.some(cat => cat.key === filterFromState)) {
        setActiveFilter(filterFromState);
    }
    window.history.replaceState({}, document.title)
  }, [location.state]);

  const filteredItems = useMemo(() => {
    if (activeFilter === 'all') return galleryItems;
    return galleryItems.filter(item => item.category === activeFilter);
  }, [activeFilter, galleryItems]);

  const selectedItem = filteredItems.find(item => item._id === selectedId);

  const navigateImage = (direction) => {
    if (!selectedItem) return;
    const currentIndex = filteredItems.findIndex(item => item._id === selectedId);
    const newIndex = (currentIndex + direction + filteredItems.length) % filteredItems.length;
    setSelectedId(filteredItems[newIndex]._id);
  };

  return (
    <motion.div className="py-24 bg-primary text-lightest-slate" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-center mb-6 font-serif text-gold-highlight">{t('gallery_title')}</h1>
        <p className="text-lg text-center text-secondary mb-12 max-w-3xl mx-auto">{t('gallery_subtitle')}</p>

        <div className="flex justify-center items-center gap-2 md:gap-4 mb-12 flex-wrap">
          <button onClick={() => setActiveFilter('all')} className={`px-4 md:px-6 py-2 font-medium rounded-full transition-all duration-300 text-sm md:text-base ${activeFilter === 'all' ? 'bg-gold-base text-primary' : 'bg-transparent border border-secondary text-secondary hover:bg-gold-base/20 hover:text-lightest-slate'}`}>
            {t('all')}
          </button>
          {CATEGORIES.map(cat => (
            <button key={cat.key} onClick={() => setActiveFilter(cat.key)} className={`px-4 md:px-6 py-2 font-medium rounded-full transition-all duration-300 text-sm md:text-base ${activeFilter === cat.key ? 'bg-gold-base text-primary' : 'bg-transparent border border-secondary text-secondary hover:bg-gold-base/20 hover:text-lightest-slate'}`}>
              {t(cat.titleKey)}
            </button>
          ))}
        </div>

        {loading ? <div className="text-center text-xl text-gold-base">טוען את הגלריה...</div> : 
         error ? <div className="text-center text-xl text-red-500">{error}</div> : (
          <motion.div layout className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            <AnimatePresence>
              {filteredItems.map(item => (
                <motion.div key={item._id} className="group overflow-hidden rounded-lg shadow-lg cursor-pointer break-inside-avoid" layoutId={`card-image-container-${item._id}`} onClick={() => setSelectedId(item._id)} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
                  {item.mediaType === 'image' ? (
                    <img src={item.mediaUrl} alt={item.title || item.category} className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-300" loading="lazy" />
                  ) : (
                    <video src={item.mediaUrl} className="w-full h-auto object-cover" loop muted playsInline onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()}/>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selectedId && selectedItem && (
          <motion.div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4" onClick={() => setSelectedId(null)}>
            <button onClick={(e) => { e.stopPropagation(); navigateImage(-1); }} className="absolute left-4 md:left-10 text-white/70 hover:text-white transition-colors z-50"><ChevronLeftIcon className="w-10 h-10" /></button>
            <motion.div className="relative max-w-5xl max-h-[90vh] w-full flex items-center justify-center" onClick={(e) => e.stopPropagation()} layoutId={`card-image-container-${selectedId}`}>
              <AnimatePresence mode="wait">
                <motion.div key={selectedId} className="w-full h-full flex items-center justify-center">
                  {selectedItem.mediaType === 'image' ? (
                      <img src={selectedItem.mediaUrl} alt={selectedItem.title} className="w-auto h-auto object-contain max-h-[90vh] rounded-lg shadow-2xl"/>
                  ) : (
                      <video src={selectedItem.mediaUrl} className="w-auto h-auto object-contain max-h-[90vh] rounded-lg shadow-2xl" controls autoPlay/>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
            <button onClick={(e) => { e.stopPropagation(); navigateImage(1); }} className="absolute right-4 md:right-10 text-white/70 hover:text-white transition-colors z-50"><ChevronRightIcon className="w-10 h-10" /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default GalleryPage;