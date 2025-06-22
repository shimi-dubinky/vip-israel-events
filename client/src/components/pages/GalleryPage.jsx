// src/components/pages/GalleryPage.jsx

const GalleryPage = () => {
  // נתוני דמה לתמונות. בעתיד הן יגיעו ממערכת הניהול.
  const images = [
    { id: 1, src: 'https://images.unsplash.com/photo-1547823328-59c63c4e5a9a?q=80&w=870', alt: 'Community at the Western Wall' },
    { id: 2, src: 'https://images.unsplash.com/photo-1561026499-b9c37b013628?q=80&w=870', alt: 'A celebratory meal' },
    { id: 3, src: 'https://images.unsplash.com/photo-1602153521352-e93215589133?q=80&w=774', alt: 'View of Jerusalem' },
    { id: 4, src: 'https://images.unsplash.com/photo-1593993821980-948a09f53a4e?q=80&w=870', alt: 'Bar Mitzvah boy reading from the Torah' },
    { id: 5, src: 'https://images.unsplash.com/photo-1585282524345-35d27a36c4a8?q=80&w=870', alt: 'Dead Sea landscape' },
    { id: 6, src: 'https://images.unsplash.com/photo-1613941490217-14736f32145b?q=80&w=870', alt: 'Luxury hotel pool' },
    { id: 7, src: 'https://images.unsplash.com/photo-1568285973397-50952d7664c5?q=80&w=870', alt: 'Celebration fireworks' },
    { id: 8, src: 'https://images.unsplash.com/photo-1580450543663-d3731c518d6a?q=80&w=870', alt: 'Ancient ruins in Caesarea' },
  ];

  return (
    <div className="py-12">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800 font-serif">Gallery</h1>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map(image => (
            <div key={image.id} className="group overflow-hidden rounded-lg shadow-md aspect-w-1 aspect-h-1">
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300 cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;