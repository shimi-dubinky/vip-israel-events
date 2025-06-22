// src/components/pages/EventsPage.jsx

const EventsPage = () => {
  // נתוני דמה עבור האירועים שלנו. בעתיד המידע הזה יגיע ממערכת ניהול.
  const events = [
    { 
      id: 1, 
      title: 'Bar & Bat Mitzvahs', 
      description: 'Unforgettable celebrations at the heart of Jewish history, from the Kotel to Masada.',
      image: 'https://images.unsplash.com/photo-1593993821980-948a09f53a4e?q=80&w=2070' // Placeholder image
    },
    { 
      id: 2, 
      title: 'Community Delegations', 
      description: 'Meaningful journeys that connect your community to the land and people of Israel.',
      image: 'https://images.unsplash.com/photo-1547823328-59c63c4e5a9a?q=80&w=1974' // Placeholder image
    },
    { 
      id: 3, 
      title: 'Luxury Family Vacations', 
      description: 'Bespoke travel experiences, crafted to perfection for your family\'s unique desires.',
      image: 'https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?q=80&w=2070' // Placeholder image
    },
  ];

  return (
    <div className="py-12">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800 font-serif">Our Signature Events</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map(event => (
          <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform">
            <img src={event.image} alt={event.title} className="w-full h-56 object-cover" />
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2 text-gray-900">{event.title}</h3>
              <p className="text-gray-700">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;