import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/login`,
        { email, password }
      );
      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4" dir="rtl">
      <div className="w-full max-w-md">
        <form onSubmit={submitHandler} className="bg-white p-8 shadow-2xl rounded-lg border border-gray-200">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8 font-serif">כניסת מנהל</h2>
          {error && <p className="mb-4 text-center text-red-600 bg-red-100 p-3 rounded">{error}</p>}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              אימייל
            </label>
            <input
              className="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gold-base"
              id="email"
              type="email"
              placeholder="הכנס אימייל"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              סיסמה
            </label>
            <input
              className="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-gold-base"
              id="password"
              type="password"
              placeholder="הכנס סיסמה"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-gold-base hover:bg-gold-highlight text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full disabled:bg-gray-400 transition-colors"
              type="submit"
              disabled={loading}
            >
              {loading ? 'מתחבר...' : 'התחבר'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;