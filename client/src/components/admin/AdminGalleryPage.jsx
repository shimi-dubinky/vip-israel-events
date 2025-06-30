import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../data/categories';
import { useTranslation } from 'react-i18next';

const categoryColorMap = {
  'celebrations': 'bg-pink-500',
  'community_events': 'bg-blue-500',
  'family_trip': 'bg-green-500',
  'holidays': 'bg-yellow-500',
};

const AdminGalleryPage = () => {
  const { t } = useTranslation();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0].key);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formError, setFormError] = useState('');
  const [adminFilter, setAdminFilter] = useState('all');

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const config = { headers: { Authorization: `Bearer ${userInfo?.token}` } };

  const fetchGalleryItems = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('https://vip-israel-server.onrender.com/api/gallery');
      setItems(data);
      setLoading(false);
    } catch (err) {
      setError('לא ניתן היה לטעון את פריטי הגלריה.');
      setLoading(false);
    }
  };

  useEffect(() => { fetchGalleryItems(); }, []);

  const deleteHandler = async (id) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק פריט זה?')) {
      try {
        await axios.delete(`https://vip-israel-server.onrender.com/api/gallery/${id}`, config);
        fetchGalleryItems();
      } catch (err) {
        setError('לא ניתן היה למחוק את הפריט.');
      }
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!file) {
      setFormError('יש לבחור קובץ להעלאה.'); return;
    }
    setUploading(true);
    setFormError('');
    const formData = new FormData();
    formData.append('file', file);
    try {
      const uploadConfig = { headers: { 'Content-Type': 'multipart/form-data' } };
      const { data: uploadData } = await axios.post('https://vip-israel-server.onrender.com/api/upload', formData, uploadConfig);
      const { url, public_id } = uploadData;
      const mediaType = file.type.startsWith('video') ? 'video' : 'image';
      const finalTitle = title.trim() === '' ? file.name : title;
      await axios.post('https://vip-israel-server.onrender.com/api/gallery', { title: finalTitle, category, mediaType, mediaUrl: url, public_id, }, config);
      setUploading(false);
      setTitle('');
      setCategory(CATEGORIES[0].key);
      setFile(null);
      if(document.getElementById('file-input')) { document.getElementById('file-input').value = null; }
      fetchGalleryItems();
    } catch (err) {
      setFormError('משהו השתבש. לא ניתן היה להוסיף את הפריט.');
      setUploading(false);
    }
  };

  const filteredItems = useMemo(() => {
    const sortedItems = [...items].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (adminFilter === 'all') return sortedItems;
    return sortedItems.filter(item => item.category === adminFilter);
  }, [adminFilter, items]);

  return (
    <div className="min-h-screen bg-primary text-lightest-slate p-8" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <Link to="/admin/dashboard" className="text-gold-base hover:text-gold-highlight mb-4 inline-block">&rarr; חזרה ללוח הבקרה</Link>
        <h1 className="text-3xl font-bold text-gold-highlight mb-6">ניהול גלריה</h1>
        <div className="bg-slate-800 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-semibold text-gold-base mb-4">הוספת פריט חדש</h2>
            <form onSubmit={submitHandler}>
                <div className="grid md:grid-cols-3 gap-4">
                    <input type="text" placeholder="כותרת (אופציונלי, לזיהוי פנימי)" value={title} onChange={(e) => setTitle(e.target.value)} className="bg-slate-700 p-2 rounded w-full placeholder:text-slate-400" />
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="bg-slate-700 p-2 rounded w-full">
                        {CATEGORIES.map(cat => <option key={cat.key} value={cat.key}>{t(cat.titleKey)}</option>)}
                    </select>
                    <input type="file" id="file-input" onChange={(e) => setFile(e.target.files[0])} required className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gold-base file:text-primary hover:file:bg-gold-highlight" />
                </div>
                <button type="submit" disabled={uploading} className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded disabled:bg-gray-500">{uploading ? 'מעלה קובץ...' : 'הוסף פריט'}</button>
                {formError && <p className="text-red-500 mt-2">{formError}</p>}
            </form>
        </div>
        <div className="mb-4">
            <h3 className="text-xl text-gold-base mb-2">סינון תצוגה:</h3>
            <div className="flex flex-wrap gap-2">
                <button onClick={() => setAdminFilter('all')} className={`px-4 py-1 text-sm rounded-full ${adminFilter === 'all' ? 'bg-gold-base text-primary' : 'bg-slate-700'}`}>{t('all')}</button>
                {CATEGORIES.map(cat => ( <button key={cat.key} onClick={() => setAdminFilter(cat.key)} className={`px-4 py-1 text-sm rounded-full ${adminFilter === cat.key ? 'bg-gold-base text-primary' : 'bg-slate-700'}`}>{t(cat.titleKey)}</button>))}
            </div>
        </div>
        {loading ? <p>טוען...</p> : error ? <p className="text-red-500">{error}</p> : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredItems.map(item => (
              <div key={item._id} className="bg-slate-800 rounded-lg p-2 relative group">
                <div className="relative">
                   {item.mediaType === 'image' ? <img src={item.mediaUrl} alt={item.title} className="w-full h-40 object-cover rounded"/> : <video src={item.mediaUrl} className="w-full h-40 object-cover rounded" controls/>}
                   <span className={`absolute top-2 right-2 h-3 w-3 rounded-full ${categoryColorMap[item.category] || 'bg-gray-400'}`} title={t(CATEGORIES.find(c => c.key === item.category)?.titleKey || '')}></span>
                </div>
                <p className="mt-2 text-center text-sm truncate" title={item.title}>{item.title || '(ללא כותרת)'}</p>
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => deleteHandler(item._id)} className="bg-red-600 text-white rounded-full p-3 hover:bg-red-700"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default AdminGalleryPage;