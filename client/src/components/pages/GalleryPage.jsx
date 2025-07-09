import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { CATEGORIES } from '../../data/categories';
import { Helmet } from 'react-helmet-async';
import Lightbox from "yet-another-react-lightbox";

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
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/gallery`);
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
    const sortedItems = [...galleryItems].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (activeFilter === 'all') return sortedItems;
    return sortedItems.filter(item => item.category === activeFilter);
  }, [activeFilter, galleryItems]);

  const selectedItem = filteredItems.find(item => item._id === selectedId);

  const navigateImage = (direction) => {
    if (!selectedItem) return;
    const currentIndex = filteredItems.findIndex(item => item._id === selectedId);
    const newIndex = (currentIndex + direction + filteredItems.length) % filteredItems.length;
    setSelectedId(filteredItems[newIndex]._id);
  };

  return (
    <>
      <Helmet>
        <title>{t('seo_gallery_title')}</title>
        <meta name="description" content={t('seo_gallery_description')} />
      </Helmet>
      <motion.div className="py-24 bg-primary text-lightest-slate" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-center mb-6 font-serif text-gold-highlight">{t('gallery_title')}</h1>
          <p className="text-lg text-center text-secondary mb-12 max-w-3xl mx-auto">{t('gallery_subtitle')}</p>
          <div className="flex justify-center items-center gap-2 md:gap-4 mb-12 flex-wrap">
            <button onClick={() => setActiveFilter('all')} className={`px-4 md:px-6 py-2 font-medium rounded-full transition-all duration-300 text-sm md:text-base ${activeFilter === 'all' ? 'bg-gold-base text-primary' : 'bg-transparent border border-secondary text-secondary hover:bg-gold-base/20 hover:text-lightest-slate'}`}>{t('all')}</button>
            {CATEGORIES.map(cat => (<button key={cat.key} onClick={() => setActiveFilter(cat.key)} className={`px-4 md:px-6 py-2 font-medium rounded-full transition-all duration-300 text-sm md:text-base ${activeFilter === cat.key ? 'bg-gold-base text-primary' : 'bg-transparent border border-secondary text-secondary hover:bg-gold-base/20 hover:text-lightest-slate'}`}>{t(cat.titleKey)}</button>))}
          </div>
          {loading ? <div className="text-center text-xl text-gold-base">טוען...</div> : 
           error ? <div className="text-center text-xl text-red-500">{error}</div> :
           filteredItems.length === 0 ? <div className="text-center text-xl text-secondary">לא נמצאו פריטים בקטגוריה זו.</div> : (
            <motion.div layout className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-2 sm:gap-4 space-y-2 sm:space-y-4">
              <AnimatePresence>
                {filteredItems.map(item => (
                  <motion.div key={item._id} className="group overflow-hidden rounded-lg shadow-lg cursor-pointer break-inside-avoid" layoutId={`card-image-container-${item._id}`} onClick={() => setSelectedId(item._id)} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
                    {item.mediaType === 'image' ? (<img src={item.mediaUrl} alt={item.title || item.category} className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-300" loading="lazy" />) : (<video src={item.mediaUrl} className="w-full h-auto object-cover" loop muted playsInline onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()}/>)}
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
        <AnimatePresence>
          {selectedId && selectedItem && (
            <Lightbox
                open={selectedId !== null}
                close={() => setSelectedId(null)}
                slides={[{src: selectedItem.mediaUrl}]}
                render={{
                  buttonPrev: filteredItems.length <= 1 ? () => null : undefined,
                  buttonNext: filteredItems.length <= 1 ? () => null : undefined,
                }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};
export default GalleryPage;