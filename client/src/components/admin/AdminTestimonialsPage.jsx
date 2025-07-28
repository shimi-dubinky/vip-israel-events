import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminTestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formState, setFormState] = useState({ author: '', origin: '', mediaType: 'quote', content: '', thumbnailFile: null, contentFile: null, videoPosterFile: null });
  const [uploading, setUploading] = useState(false);
  const [formError, setFormError] = useState('');

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const config = { headers: { Authorization: `Bearer ${userInfo?.token}` } };

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/testimonials`);
      setTestimonials(data);
      setLoading(false);
    } catch (err) {
      setError('לא ניתן היה לטעון את ההמלצות.');
      setLoading(false);
    }
  };

  useEffect(() => { fetchTestimonials(); }, []);

  const deleteHandler = async (id) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק המלצה זו?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/testimonials/${id}`, config);
        fetchTestimonials();
      } catch (err) {
        setError('לא ניתן היה למחוק את ההמלצה.');
      }
    }
  };

  const handleFormChange = (e) => { setFormState({ ...formState, [e.target.name]: e.target.value }); };
  const handleFileChange = (e) => { setFormState({ ...formState, [e.target.name]: e.target.files[0] }); };

  const uploadFileHandler = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const uploadConfig = { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${userInfo?.token}` } };
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/upload`, formData, uploadConfig);
    return data;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setUploading(true);
    setFormError('');
    try {
      if (!formState.thumbnailFile) throw new Error('יש להעלות תמונת פרופיל.');
      
      const thumbnailData = await uploadFileHandler(formState.thumbnailFile);
      let contentData = { url: formState.content, public_id: null };
      let videoPosterData = { url: null, public_id: null };

      if (formState.mediaType === 'image' || formState.mediaType === 'video') {
        if (!formState.contentFile) throw new Error('עבור המלצת תמונה או וידאו, יש לבחור קובץ תוכן.');
        contentData = await uploadFileHandler(formState.contentFile);
      }
      if (formState.mediaType === 'video') {
        if (!formState.videoPosterFile) throw new Error('עבור המלצת וידאו, יש לבחור תמונת תצוגה מקדימה.');
        videoPosterData = await uploadFileHandler(formState.videoPosterFile);
      }
      
      const testimonialPayload = { author: formState.author, origin: formState.origin, mediaType: formState.mediaType, content: contentData.url, thumbnailUrl: thumbnailData.url, videoPosterUrl: videoPosterData.url, content_public_id: contentData.public_id, thumbnail_public_id: thumbnailData.public_id, videoPoster_public_id: videoPosterData.public_id };
      await axios.post(`${import.meta.env.VITE_API_URL}/api/testimonials`, testimonialPayload, config);
      
      setUploading(false);
      setFormState({ author: '', origin: '', mediaType: 'quote', content: '', thumbnailFile: null, contentFile: null, videoPosterFile: null });
      ['thumbnailFile-input', 'contentFile-input', 'videoPosterFile-input'].forEach(id => {
        if(document.getElementById(id)) document.getElementById(id).value = null;
      });
      fetchTestimonials();
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'משהו השתבש. לא ניתן היה להוסיף המלצה.';
      setFormError(errorMessage);
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-8" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <Link to="/admin/dashboard" className="text-gold-base hover:text-gold-highlight mb-4 inline-block font-semibold">&rarr; חזרה ללוח הבקרה</Link>
        <h1 className="text-3xl font-bold text-primary mb-6 font-serif">ניהול ממליצים</h1>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 font-serif">הוספת המלצה חדשה</h2>
          <form onSubmit={submitHandler} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input type="text" name="author" placeholder="שם הממליץ" value={formState.author} onChange={handleFormChange} required className="bg-gray-50 border border-gray-300 p-2 rounded w-full" />
              <input type="text" name="origin" placeholder="חברה / מקור (אופציונלי)" value={formState.origin} onChange={handleFormChange} className="bg-gray-50 border border-gray-300 p-2 rounded w-full" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1 text-gray-600">סוג ההמלצה</label>
              <select name="mediaType" value={formState.mediaType} onChange={handleFormChange} className="bg-gray-50 border border-gray-300 p-2 rounded w-full">
                <option value="quote">ציטוט (טקסט)</option>
                <option value="image">תמונה</option>
                <option value="video">וידאו</option>
              </select>
            </div>
            {formState.mediaType === 'quote' && (<textarea name="content" placeholder="תוכן ההמלצה..." value={formState.content} onChange={handleFormChange} required rows="4" className="bg-gray-50 border border-gray-300 p-2 rounded w-full"></textarea>)}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-1 text-gray-600">תמונת פרופיל (Thumbnail)*</label>
                <input type="file" name="thumbnailFile" id="thumbnailFile-input" onChange={handleFileChange} required accept="image/*" className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gold-base/20 file:text-gold-base hover:file:bg-gold-base/30"/>
              </div>
              {formState.mediaType === 'image' && (<div><label className="block text-sm font-bold mb-1 text-gray-600">קובץ התמונה*</label><input type="file" name="contentFile" id="contentFile-input" onChange={handleFileChange} required accept="image/*" className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gold-base/20 file:text-gold-base hover:file:bg-gold-base/30"/></div>)}
              {formState.mediaType === 'video' && (
                <>
                  <div><label className="block text-sm font-bold mb-1 text-gray-600">קובץ הווידאו*</label><input type="file" name="contentFile" id="contentFile-input" onChange={handleFileChange} required accept="video/*" className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gold-base/20 file:text-gold-base hover:file:bg-gold-base/30"/></div>
                  <div><label className="block text-sm font-bold mb-1 text-gray-600">תמונת תצוגה מקדימה לווידאו*</label><input type="file" name="videoPosterFile" id="videoPosterFile-input" onChange={handleFileChange} required accept="image/*" className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gold-base/20 file:text-gold-base hover:file:bg-gold-base/30"/></div>
                </>
              )}
            </div>
            <button type="submit" disabled={uploading} className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded disabled:bg-gray-500 transition-colors">{uploading ? 'מעלה קבצים...' : 'הוסף המלצה'}</button>
            {formError && <p className="text-red-500 mt-2">{formError}</p>}
          </form>
        </div>
        {loading ? <p>טוען...</p> : error ? <p className="text-red-500">{error}</p> : (
            <div className="space-y-4">
                {testimonials.map(item => (
                    <div key={item._id} className="bg-white rounded-lg p-4 flex items-start gap-4 shadow-sm border border-gray-200">
                        <img src={item.thumbnailUrl} alt={item.author} className="w-16 h-16 rounded-full object-cover"/>
                        <div className="flex-grow">
                            <h3 className="font-bold text-primary">{item.author}</h3>
                            <p className="text-sm text-secondary">{item.origin}</p>
                            {item.mediaType === 'quote' && <p className="mt-2 text-gray-700 italic">"{item.content}"</p>}
                            {item.mediaType === 'image' && <img src={item.content} alt="Testimonial content" className="mt-2 max-w-xs rounded shadow-md"/>}
                            {item.mediaType === 'video' && <video src={item.content} className="mt-2 max-w-xs rounded shadow-md" controls poster={item.videoPosterUrl}/>}
                        </div>
                        <button onClick={() => deleteHandler(item._id)} className="bg-red-500 text-white rounded-full p-2 hover:bg-red-600 self-center transition-colors"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                    </div>
                ))}
            </div>
        )}
      </div>
    </div>
  );
};
export default AdminTestimonialsPage;