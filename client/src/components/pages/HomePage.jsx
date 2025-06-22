// src/components/pages/HomePage.jsx
import { motion } from 'framer-motion';

const HomePage = () => {
  // אתה יכול להחליף את הקישור הזה לכל תמונה איכותית אחרת
  const backgroundImageUrl = 'https://images.unsplash.com/photo-1602153521352-e93215589133?q=80&w=1935'; // A nice view of Jerusalem

  return (
    <div>
      {/* ====== Hero Section Start ====== */}
      <section 
        className="relative text-center h-[70vh] min-h-[500px] flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${backgroundImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        {/* This div is an overlay to make the text readable */}
        <div className="absolute inset-0 bg-primary bg-opacity-60"></div>
        
        {/* All content is now inside this relatively positioned div */}
        <div className="relative z-10 container mx-auto px-4">
          <motion.h1 
            className="text-4xl md:text-6xl font-extrabold leading-tight font-serif"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Your Unforgettable Israeli Milestone, Perfectly Orchestrated
          </motion.h1>
          
          <motion.p 
            className="mt-6 text-lg md:text-xl max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            From breathtaking Bar Mitzvahs at the Kotel to joyous family celebrations, we handle every detail with precision, care, and exclusive access.
          </motion.p>

          <motion.a 
            href="/contact" 
            className="mt-10 inline-block bg-accent text-primary font-bold py-4 px-10 rounded-lg text-lg hover:bg-opacity-90 transition-all transform hover:scale-105"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Plan Your Event Today
          </motion.a>
        </div>
      </section>
      {/* ====== Hero Section End ====== */}


      {/* ====== Featured Events Section Start ====== */}
      <motion.section 
        className="py-20 bg-background" // Using our brand background color
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 font-serif">
            Our Signature Experiences
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2 font-serif text-primary">Bar Mitzvahs</h3>
              <p className="text-secondary">Unforgettable celebrations at the heart of Jewish history.</p>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2 font-serif text-primary">Community Delegations</h3>
              <p className="text-secondary">Meaningful journeys that connect your community to Israel.</p>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2 font-serif text-primary">Luxury Vacations</h3>
              <p className="text-secondary">Bespoke travel experiences, crafted to perfection.</p>
            </div>
          </div>
        </div>
      </motion.section>
  {/* ====== Featured Events Section End ====== */}
      {/* ====== Why Us Section Start ====== */}
<motion.section
  className="py-20 bg-white"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 1 }}
>
  <div className="container mx-auto px-4">
    <div className="grid md:grid-cols-2 gap-12 items-center">
      {/* Image Column */}
      <div className="order-last md:order-first">
        <img 
          src="https://images.unsplash.com/photo-1519672198583-e25a1e4559bb?q=80&w=1887" 
          alt="Personalized service with a handshake"
          className="rounded-lg shadow-xl"
        />
      </div>

      {/* Text Column */}
      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 font-serif">
          Bespoke Service, Unmatched Access
        </h2>
        <p className="text-secondary mb-8">
          We believe that luxury is personal. Our team is dedicated to understanding your unique vision and bringing it to life with meticulous planning and exclusive connections that only we can provide.
        </p>
        <ul className="space-y-4">
          <li className="flex items-start">
            <span className="bg-accent text-primary rounded-full flex-shrink-0 w-6 h-6 flex items-center justify-center font-bold mr-4 mt-1">✓</span>
            <span className="flex-1 text-secondary">24/7 Personal Concierge</span>
          </li>
          <li className="flex items-start">
            <span className="bg-accent text-primary rounded-full flex-shrink-0 w-6 h-6 flex items-center justify-center font-bold mr-4 mt-1">✓</span>
            <span className="flex-1 text-secondary">Access to exclusive venues and leading figures</span>
          </li>
          <li className="flex items-start">
            <span className="bg-accent text-primary rounded-full flex-shrink-0 w-6 h-6 flex items-center justify-center font-bold mr-4 mt-1">✓</span>
            <span className="flex-1 text-secondary">Complete peace of mind from arrival to departure</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</motion.section>
{/* ====== Why Us Section End ====== */}
    

    </div>
  );
};

export default HomePage;