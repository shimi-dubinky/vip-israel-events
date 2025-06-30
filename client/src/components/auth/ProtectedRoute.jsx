import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  // אם המשתמש מחובר, הצג את העמוד המבוקש.
  // אם לא, שלח אותו לדף ההתחברות הראשי שנמצא ב- /admin
  return userInfo && userInfo.token ? <Outlet /> : <Navigate to="/admin" replace />;
};

export default ProtectedRoute;