import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  // אם המשתמש מחובר, הצג את העמוד המבוקש (באמצעות Outlet)
  // אחרת, שלח אותו לדף ההתחברות
  return userInfo ? <Outlet /> : <Navigate to="/admin" replace />;
};

export default ProtectedRoute;