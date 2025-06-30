import axios from 'axios';

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`, // הכתובת הבסיסית לכל בקשות ה-API
});

export default instance;