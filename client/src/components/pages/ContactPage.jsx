// src/components/pages/ContactPage.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${formData.name}! Your message has been received.`);
    console.log(formData);
  };

  return (
    <motion.div
      className="py-12 bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.h1 
          className="text-4xl font-bold text-center mb-8 text-primary font-serif"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Contact Us
        </motion.h1>
        <motion.p 
          className="text-center text-secondary mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Ready to plan the event of a lifetime? Fill out the form below and we'll be in touch shortly.
        </motion.p>
        <motion.form 
          onSubmit={handleSubmit} 
          className="bg-white p-8 rounded-lg shadow-xl space-y-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-text-main mb-1">Full Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-accent focus:border-accent transition-colors" required />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text-main mb-1">Email Address</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-accent focus:border-accent transition-colors" required />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-text-main mb-1">Phone Number (Optional)</label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-accent focus:border-accent transition-colors" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-text-main mb-1">Tell us about your event</label>
            <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="5" className="w-full p-3 border border-gray-300 rounded-md focus:ring-accent focus:border-accent transition-colors" required></textarea>
          </div>
          <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-opacity-90 transition-colors text-lg">
            Send Message
          </button>
        </motion.form> 
      </div>
    </motion.div>
  );
};

export default ContactPage;