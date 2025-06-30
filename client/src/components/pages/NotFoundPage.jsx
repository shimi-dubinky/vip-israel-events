import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-primary text-white flex items-center justify-center text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-8xl md:text-9xl font-bold text-gold-base font-serif">404</h1>
        <h2 className="text-3xl md:text-4xl mt-4 font-semibold text-lightest-slate">העמוד לא נמצא</h2>
        <p className="mt-4 text-lg text-secondary">מצטערים, לא מצאנו את העמוד שחיפשת.</p>
        <Link 
          to="/"
          className="mt-10 inline-block bg-gold-base text-primary font-bold py-3 px-8 rounded-lg text-lg hover:bg-gold-highlight transition-colors"
        >
          חזרה לדף הבית
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;