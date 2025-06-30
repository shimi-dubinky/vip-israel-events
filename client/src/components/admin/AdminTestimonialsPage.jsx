import { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { Link } from 'react-router-dom';

const AdminTestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  
  const [formState, setFormState] = useState({
    author: '',
    origin: '',
    mediaType: 'quote', // 'quote', 'image', or 'video'
    content: '', // For quote text
    thumbnailFile: null, // For author's picture
    contentFile: null, // For image or video testimonial
  });
  const [uploading, setUploading] = useState(false);
  const [formError, setFormError] = useState('');

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const config = { headers: { Authorization: `Bearer ${userInfo?.token}` } };

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/testimonials');
      setTestimonials(data);
      setLoading(false);
    } catch (err) {
      setError('לא ניתן היה לטעון את ההמלצות.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const deleteHandler = async (id) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק המלצה זו?')) {
      try {
        await axios.delete(`http://localhost:5000/api/testimonials/${id}`, config);
        fetchTestimonials();
      } catch (err) {
        setError('לא ניתן היה למחוק את ההמלצה.');
      }
    }
  };

  const handleFormChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.files[0] });
  };

  const uploadFileHandler = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const uploadConfig = { headers: { 'Content-Type': 'multipart/form-data' } };
    const { data } = await axios.post('http://localhost:5000/api/upload', formData, uploadConfig);
    return data; 
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setUploading(true);
    setFormError('');

    try {
      if (!formState.thumbnailFile) {
        throw new Error('יש להעלות תמונת פרופיל (תמונה ממוזערת).');
      }

      // 1. Upload thumbnail
      const thumbnailData = await uploadFileHandler(formState.thumbnailFile);
      
      let contentData = { url: null, public_id: null };
      let testimonialContent = formState.content;

      // 2. Upload content file if it's an image or video testimonial
      if (formState.mediaType === 'image' || formState.mediaType === 'video') {
        if (!formState.contentFile) {
          throw new Error('עבור המלצת תמונה או וידאו, יש לבחור קובץ תוכן.');
        }
        contentData = await uploadFileHandler(formState.contentFile);
        testimonialContent = contentData.url; // The content is the URL to the media
      }
      
      // 3. Create the testimonial in the database
      const testimonialPayload = {
        author: formState.author,
        origin: formState.origin,
        mediaType: formState.mediaType,
        content: testimonialContent,
        thumbnailUrl: thumbnailData.url,
        thumbnail_public_id: thumbnailData.public_id,
        content_public_id: contentData.public_id,
      };

      await axios.post('http://localhost:5000/api/testimonials', testimonialPayload, config);
      
      // Reset form and refresh list
      setUploading(false);
      setFormState({ author: '', origin: '', mediaType: 'quote', content: '', thumbnailFile: null, contentFile: null });
      document.getElementById('thumbnailFile-input').value = null;
      if (document.getElementById('contentFile-input')) {
        document.getElementById('contentFile-input').value = null;
      }
      fetchTestimonials();

    } catch (err) {
      setFormError(err.message || 'משהו השתבש. לא ניתן היה להוסיף המלצה.');
      setUploading(false);
    }
  };


  return (
    <div className="min-h-screen bg-primary text-lightest-slate p-8" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <Link to="/admin/dashboard" className="text-gold-base hover:text-gold-highlight mb-4 inline-block">&rarr; חזרה ללוח הבקרה</Link>
        <h1 className="text-3xl font-bold text-gold-highlight mb-6">ניהול ממליצים</h1>

    
        <div className="bg-slate-800 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-semibold text-gold-base mb-4">הוספת המלצה חדשה</h2>
            <form onSubmit={submitHandler} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                    <input type="text" name="author" placeholder="שם הממליץ" value={formState.author} onChange={handleFormChange} required className="bg-slate-700 p-2 rounded w-full" />
                    <input type="text" name="origin" placeholder="חברה / מקור (אופציונלי)" value={formState.origin} onChange={handleFormChange} className="bg-slate-700 p-2 rounded w-full" />
                </div>

                <div>
                    <label className="block text-sm font-bold mb-1">סוג ההמלצה</label>
                    <select name="mediaType" value={formState.mediaType} onChange={handleFormChange} className="bg-slate-700 p-2 rounded w-full">
                        <option value="quote">ציטוט (טקסט)</option>
                        <option value="image">תמונה</option>
                        <option value="video">וידאו</option>
                    </select>
                </div>

                {formState.mediaType === 'quote' && (
                    <textarea name="content" placeholder="תוכן ההמלצה..." value={formState.content} onChange={handleFormChange} required rows="4" className="bg-slate-700 p-2 rounded w-full"></textarea>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold mb-1">תמונת פרופיל (Thumbnail)*</label>
                        <input type="file" name="thumbnailFile" id="thumbnailFile-input" onChange={handleFileChange} required accept="image/*" className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-gold-base/80 file:text-primary hover:file:bg-gold-base" />
                    </div>
                    {(formState.mediaType === 'image' || formState.mediaType === 'video') && (
                        <div>
                            <label className="block text-sm font-bold mb-1">קובץ התוכן (תמונה/וידאו)*</label>
                            <input type="file" name="contentFile" id="contentFile-input" onChange={handleFileChange} required accept={formState.mediaType === 'image' ? 'image/*' : 'video/*'} className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-gold-base/80 file:text-primary hover:file:bg-gold-base" />
                        </div>
                    )}
                </div>

                <button type="submit" disabled={uploading} className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded disabled:bg-gray-500">
                    {uploading ? 'מעלה קבצים...' : 'הוסף המלצה'}
                </button>
                {formError && <p className="text-red-500 mt-2">{formError}</p>}
            </form>
        </div>

        {/* Existing Testimonials List */}
        {loading ? <p>טוען...</p> : error ? <p className="text-red-500">{error}</p> : (
            <div className="space-y-4">
                {testimonials.map(item => (
                    <div key={item._id} className="bg-slate-800 rounded-lg p-4 flex items-start gap-4">
                        <img src={item.thumbnailUrl} alt={item.author} className="w-16 h-16 rounded-full object-cover"/>
                        <div className="flex-grow">
                            <h3 className="font-bold text-gold-base">{item.author}</h3>
                            <p className="text-sm text-secondary">{item.origin}</p>
                            
                            {item.mediaType === 'quote' && <p className="mt-2 text-lightest-slate italic">"{item.content}"</p>}
                            {item.mediaType === 'image' && <img src={item.content} alt="Testimonial content" className="mt-2 max-w-xs rounded"/>}
                            {item.mediaType === 'video' && <video src={item.content} className="mt-2 max-w-xs rounded" controls/>}
                        </div>
                        <button onClick={() => deleteHandler(item._id)} className="bg-red-600 text-white rounded-full p-2 hover:bg-red-700 self-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                    </div>
                ))}
            </div>
        )}
      </div>
    </div>
  );
};

export default AdminTestimonialsPage;