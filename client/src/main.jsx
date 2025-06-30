// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import './i18n';
import 'react-datepicker/dist/react-datepicker.css';
import "yet-another-react-lightbox/styles.css"; // <-- הוספת שורת ה-CSS החדשה

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);