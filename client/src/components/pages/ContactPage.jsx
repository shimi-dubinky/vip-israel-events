import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import DatePicker from 'react-datepicker';
import axios from 'axios';

const ContactPage = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', participants: '', eventType: '', message: '' });
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const eventTypes = [ 'בר/בת מצווה', 'גיבוש קהילה', 'נסיעת קודש / משפחתי', 'סידור חגים בארץ הקודש', 'אחר' ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    const finalFormData = {
        ...formData,
        startDate: startDate ? startDate.toISOString().split('T')[0] : '',
        endDate: endDate ? endDate.toISOString().split('T')[0] : '',
    };
    try {
      await axios.post('https://vip-israel-server.onrender.com/api/contact', finalFormData);
      setSubmitMessage(t('contact_success_message', { name: formData.name }));
      setFormData({ name: '', email: '', phone: '', participants: '', eventType: '', message: '' });
      setStartDate(null);
      setEndDate(null);
    } catch (error) {
      console.error('There was an error submitting the form:', error);
      setSubmitMessage(t('contact_error_message'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div className="py-24 bg-primary" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gold-highlight font-serif" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>{t('contact_title')}</motion.h1>
        <motion.p className="text-center text-lg text-secondary mb-10" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>{t('contact_subtitle')}</motion.p>
        <motion.form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 shadow-xl space-y-6" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.6 }}>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-lightest-slate mb-1">{t('form_name')}*</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full bg-slate-900/50 p-3 border border-slate-700 rounded-md text-white focus:ring-gold-base focus:border-gold-base transition-colors" required />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-lightest-slate mb-1">{t('form_email')}*</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-slate-900/50 p-3 border border-slate-700 rounded-md text-white focus:ring-gold-base focus:border-gold-base transition-colors" required />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-lightest-slate mb-1">{t('form_phone')}</label>
              <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-slate-900/50 p-3 border border-slate-700 rounded-md text-white focus:ring-gold-base focus:border-gold-base transition-colors" />
            </div>
            <div>
              <label htmlFor="participants" className="block text-sm font-medium text-lightest-slate mb-1">כמות משתתפים צפויה</label>
              <input type="number" id="participants" name="participants" min="1" value={formData.participants} onChange={handleChange} className="w-full bg-slate-900/50 p-3 border border-slate-700 rounded-md text-white focus:ring-gold-base focus:border-gold-base transition-colors" />
            </div>
          </div>
          <div>
             <label className="block text-sm font-medium text-lightest-slate mb-1">תאריכי טיול (מ- עד)</label>
             <div className="grid md:grid-cols-2 gap-6">
                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} selectsStart startDate={startDate} endDate={endDate} placeholderText="תאריך התחלה" className="w-full bg-slate-900/50 p-3 border border-slate-700 rounded-md text-white focus:ring-gold-base focus:border-gold-base transition-colors" dateFormat="dd/MM/yyyy"/>
                <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} selectsEnd startDate={startDate} endDate={endDate} minDate={startDate} placeholderText="תאריך סיום" className="w-full bg-slate-900/50 p-3 border border-slate-700 rounded-md text-white focus:ring-gold-base focus:border-gold-base transition-colors" dateFormat="dd/MM/yyyy"/>
             </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-lightest-slate mb-2">סוג האירוע*</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {eventTypes.map(event => (
                <div key={event}>
                  <input type="radio" id={event} name="eventType" value={event} onChange={handleChange} checked={formData.eventType === event} className="sr-only" required />
                  <label htmlFor={event} className={`block text-center p-3 rounded-md cursor-pointer border transition-all ${formData.eventType === event ? 'bg-gold-base border-gold-base text-primary font-bold' : 'bg-slate-900/50 border-slate-700 text-lightest-slate hover:border-slate-500'}`}>{event}</label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-lightest-slate mb-1">{t('form_message')}*</label>
            <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="5" className="w-full bg-slate-900/50 p-3 border border-slate-700 rounded-md text-white focus:ring-gold-base focus:border-gold-base transition-colors" required></textarea>
          </div>
          <button type="submit" className="w-full bg-gold-base text-primary font-bold py-3 rounded-lg hover:bg-gold-highlight transition-colors text-lg disabled:bg-gray-400 disabled:cursor-not-allowed" disabled={isSubmitting}>
            {isSubmitting ? 'שולח...' : t('form_button')}
          </button>
          {submitMessage && <p className={`mt-4 text-center font-medium ${submitMessage.includes('Sorry') ? 'text-red-500' : 'text-green-500'}`}>{submitMessage}</p>}
        </motion.form>
      </div>
    </motion.div>
  );
};
export default ContactPage;