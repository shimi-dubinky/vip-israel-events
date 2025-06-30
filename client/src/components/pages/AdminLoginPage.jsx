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
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(
       'https://vip-israel-server.onrender.com/api/users/login',
        { email, password },
        config
      );
      
      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);
      navigate('/admin/dashboard');

    } catch (err) {
      setError(err.response && err.response.data.message ? err.response.data.message : err.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-primary p-4" dir="rtl">
      <div className="w-full max-w-md">
        <form onSubmit={submitHandler} className="bg-slate-800 p-8 shadow-2xl rounded-lg">
          <h2 className="text-2xl font-bold text-center text-gold-highlight mb-8">כניסת מנהל</h2>
          {error && <p className="mb-4 text-center text-red-500 bg-red-100 p-2 rounded">{error}</p>}
          <div className="mb-4">
            <label className="block text-lightest-slate text-sm font-bold mb-2" htmlFor="email">
              אימייל
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-slate-700 text-lightest-slate leading-tight focus:outline-none focus:shadow-outline focus:border-gold-base"
              id="email"
              type="email"
              placeholder="הכנס אימייל"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-lightest-slate text-sm font-bold mb-2" htmlFor="password">
              סיסמה
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-slate-700 text-lightest-slate mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-gold-base"
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
              className="bg-gold-base hover:bg-gold-highlight text-primary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full disabled:bg-gray-400"
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