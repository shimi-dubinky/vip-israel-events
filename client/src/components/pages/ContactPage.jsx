// src/components/pages/ContactPage.jsx
import { useState } from 'react';

const ContactPage = () => {
  // This is a React Hook to manage the form's data (state)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  // This function updates the state every time you type in an input field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // This function runs when you submit the form
  const handleSubmit = (e) => {
    e.preventDefault();
    // Later, we will send this data to our server. For now, we just show an alert.
    alert(`Thank you, ${formData.name}! Your message has been received.`);
    console.log(formData);
    // Here you would typically clear the form or redirect
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 font-serif">Contact Us</h1>
        <p className="text-center text-gray-600 mb-10">
          Ready to plan the event of a lifetime? Fill out the form below and we'll be in touch shortly.
        </p>
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" required />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" required />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number (Optional)</label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Tell us about your event</label>
            <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="5" className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" required></textarea>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;