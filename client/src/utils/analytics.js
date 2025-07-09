import ReactGA from 'react-ga4';

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export const initGA = () => {
  // הפונקציה תפעל רק אם המזהה קיים ואינו ריק
  if (GA_MEASUREMENT_ID) {
    ReactGA.initialize(GA_MEASUREMENT_ID);
    console.log("Google Analytics Initialized with ID:", GA_MEASUREMENT_ID);
  }
};

export const logPageView = () => {
  if (GA_MEASUREMENT_ID) {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname + window.location.search });
  }
};