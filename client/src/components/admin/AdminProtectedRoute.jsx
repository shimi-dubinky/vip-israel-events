import { Navigate, Outlet } from 'react-router-dom';

const AdminProtectedRoute = () => {
  // נבדוק אם יש פרטי משתמש שמורים ב-localStorage
  // (נשמור אותם שם לאחר התחברות מוצלחת)
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  // אם המשתמש מחובר, נציג את התוכן המבוקש (באמצעות Outlet)
  // אם לא, נעביר אותו לדף ההתחברות
  return userInfo && userInfo.token ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default AdminProtectedRoute;