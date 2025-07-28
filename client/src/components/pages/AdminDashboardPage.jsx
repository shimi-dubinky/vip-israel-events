import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminDashboardPage = () => {
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const logoutHandler = () => {
        localStorage.removeItem('userInfo');
        navigate('/admin');
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-800 p-8" dir="rtl">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-bold text-primary font-serif">לוח בקרה</h1>
                    <button onClick={logoutHandler} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors">
                        התנתק
                    </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Link to="/admin/gallery" className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-gray-200">
                        <h2 className="text-2xl font-semibold text-gold-base mb-2 font-serif">ניהול גלריה</h2>
                        <p className="text-secondary">צפייה, הוספה ומחיקה של פריטים בגלריה.</p>
                    </Link>
                    <Link to="/admin/testimonials" className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-gray-200">
                        <h2 className="text-2xl font-semibold text-gold-base mb-2 font-serif">ניהול ממליצים</h2>
                        <p className="text-secondary">צפייה, הוספה ומחיקה של המלצות.</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;