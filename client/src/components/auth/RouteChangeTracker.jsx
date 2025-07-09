import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { logPageView } from '../../utils/analytics';

const RouteChangeTracker = () => {
  const location = useLocation();

  useEffect(() => {
    logPageView();
  }, [location]);

  return null; // רכיב זה לא מציג כלום, רק עוקב
};

export default RouteChangeTracker;