// src/components/pages/TestimonialsPage.jsx

const TestimonialsPage = () => {
  // נתוני דמה עבור ממליצים
  const testimonials = [
    {
      id: 1,
      quote: "Working with them was the best decision we made. They took care of everything for our son's Bar Mitzvah, allowing us to truly be present and enjoy the moment. Flawless execution and unparalleled access.",
      author: "The Cohen Family",
      origin: "New York, NY",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg" // תמונת פרופיל זמנית
    },
    {
      id: 2,
      quote: "An absolutely magical experience. The entire trip was seamless, from the VIP airport service to the incredible tours. Our community delegation felt connected and inspired.",
      author: "Rabbi Shmuel Goldstein",
      origin: "Congregation Beth Jacob, LA",
      avatar: "https://randomuser.me/api/portraits/men/51.jpg" // תמונת פרופיל זמנית
    },
    {
      id: 3,
      quote: "They turned our dream family vacation into a reality. The attention to detail was astonishing. We will cherish these memories forever.",
      author: "Sarah & Michael Rosen",
      origin: "Chicago, IL",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg" // תמונת פרופיל זמנית
    }
  ];

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">What Our Clients Say</h1>
        <div className="space-y-8">
          {testimonials.map(testimonial => (
            <blockquote key={testimonial.id} className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
              <p className="text-lg text-gray-700 italic leading-relaxed">"{testimonial.quote}"</p>
              <footer className="mt-6 flex items-center">
                <img src={testimonial.avatar} alt={testimonial.author} className="w-14 h-14 rounded-full mr-4 object-cover"/>
                <div>
                  <p className="font-bold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.origin}</p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsPage;