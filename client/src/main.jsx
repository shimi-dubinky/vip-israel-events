import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { initGA } from './utils/analytics';
import './i18n';

// CSS Files
import 'react-datepicker/dist/react-datepicker.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "yet-another-react-lightbox/styles.css";
import 'react-phone-number-input/style.css';

initGA(); // הפעלת האתחול של גוגל אנליטיקס

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);