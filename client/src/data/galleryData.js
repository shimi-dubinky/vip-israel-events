// שימו לב שהנתיבים לתמונות מתחילים ב-'/' כי הם נטענים מתיקיית public/images
// עליך לוודא שהעברת את התמונות למיקום זה
export const galleryImages = [
  { id: 1, category: 'events', src: '/images/image1.jpg', alt: 'Elegant event setting' },
  { id: 2, category: 'tours', src: '/images/amt_helicopter.jpg', alt: 'Helicopter tour over Jerusalem' },
  { id: 3, category: 'events', src: '/images/image2.jpg', alt: 'Luxury dinner table' },
  { id: 4, category: 'celebrations', src: '/images/image3.jpg', alt: 'Bar Mitzvah at the Kotel' },
  { id: 5, category: 'tours', src: '/images/kotel_bg.jpg', alt: 'View of the Western Wall' },
  // אתה יכול להוסיף כאן כמה תמונות שתרצה, באותו מבנה
  // לדוגמה:
  // { id: 6, category: 'celebrations', src: '/images/another-image.jpg', alt: 'A beautiful celebration' },
];

// אלו הקטגוריות שנשתמש בהן לסינון. המפתח 'name' ישמש לתרגום
export const galleryCategories = [
    { key: 'all', name: 'gallery_cat_all' }, 
    { key: 'events', name: 'gallery_cat_events' },
    { key: 'tours', name: 'gallery_cat_tours' },
    { key: 'celebrations', name: 'gallery_cat_celebrations' },
];