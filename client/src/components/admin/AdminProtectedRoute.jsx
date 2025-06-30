import { Navigate, Outlet } from 'react-router-dom';

const AdminProtectedRoute = () => {
 
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  return userInfo && userInfo.token ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default AdminProtectedRoute;