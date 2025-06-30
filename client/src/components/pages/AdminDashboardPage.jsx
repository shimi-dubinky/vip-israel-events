import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminDashboardPage = () => {
    const navigate = useNavigate();

    const logoutHandler = () => {
        localStorage.removeItem('userInfo');
        navigate('/admin/login');
    };

    return (
        <div className="min-h-screen bg-primary text-lightest-slate p-8" dir="rtl">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-bold text-gold-highlight">לוח בקרה</h1>
                    <button onClick={logoutHandler} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        התנתק
                    </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Link to="/admin/gallery" className="bg-slate-800 p-8 rounded-lg hover:bg-slate-700 transition-colors text-center md:text-right">
                        <h2 className="text-2xl font-semibold text-gold-base mb-2">ניהול גלריה</h2>
                        <p className="text-secondary">צפייה, הוספה ומחיקה של פריטים בגלריה.</p>
                    </Link>
                    <Link to="/admin/testimonials" className="bg-slate-800 p-8 rounded-lg hover:bg-slate-700 transition-colors text-center md:text-right">
                        <h2 className="text-2xl font-semibold text-gold-base mb-2">ניהול ממליצים</h2>
                        <p className="text-secondary">צפייה, הוספה ומחיקה של המלצות.</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;