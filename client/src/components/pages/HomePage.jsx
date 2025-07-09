import { Helmet } from 'react-helmet-async';
import { PremiumHero } from "../home/PremiumHero";
import { ServicesGrid } from "../home/ServicesGrid";
import { WhyUsSection } from "../home/WhyUsSection";
import { TestimonialsCarousel } from "../home/TestimonialsCarousel";

const HomePage = () => {
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