import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next'; // <-- 1. הוספת הייבוא החסר
import { PremiumHero } from "../home/PremiumHero";
import { ServicesGrid } from "../home/ServicesGrid";
import { WhyUsSection } from "../home/WhyUsSection";
import { TestimonialsCarousel } from "../home/TestimonialsCarousel";

const HomePage = () => {
  const { t } = useTranslation(); // <-- 2. הוספת ההצהרה על הפונקציה t

  return (
    <>
      <Helmet>
        <title>{t('seo_home_title')}</title>
        <meta name="description" content={t('seo_home_description')} />
      </Helmet>
      
      <div>
        <PremiumHero />
        <ServicesGrid />
        <WhyUsSection />
        <TestimonialsCarousel />
      </div>
    </>
  );
};

export default HomePage;