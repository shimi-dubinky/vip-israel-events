import { PremiumHero } from "../home/PremiumHero";
import { ServicesGrid } from "../home/ServicesGrid";
import { WhyUsSection } from "../home/WhyUsSection";
import { TestimonialsCarousel } from "../home/TestimonialsCarousel";

const HomePage = () => {
  return (
    <div>
      <PremiumHero />
      <ServicesGrid />
      <WhyUsSection />
      <TestimonialsCarousel />
    </div>
  );
};

export default HomePage;