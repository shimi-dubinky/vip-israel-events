// src/components/pages/HomePage.jsx

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-100 text-center py-20 md:py-32">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 leading-tight">
            Your Unforgettable Israeli Milestone, Perfectly Orchestrated
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            From breathtaking Bar Mitzvahs at the Kotel to joyous family celebrations, we handle every detail with precision, care, and exclusive access.
          </p>
          <a
            href="/contact"
            className="mt-10 inline-block bg-blue-600 text-white font-bold py-4 px-10 rounded-lg text-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
          >
            Plan Your Event Today
          </a>
        </div>
      </section>

      {/* Other homepage sections like "Why Us?" or "Featured Events" will go here... */}
    </div>
  );
};

export default HomePage;