const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const GalleryItem = require('./models/GalleryItem.js');

dotenv.config();

// מפת המרה מהקטגוריות בעברית למפתחות החדשים באנגלית
const categoryMap = {
  'שמחות': 'celebrations',
  'גיבושים קהילתיים': 'community_events',
  'נסיעה משפחתית לארץ ישראל': 'family_trip',
  'חגים בארץ הקודש': 'holidays',
};

const migrate = async () => {
  try {
    await connectDB();
    console.log('Starting migration from Hebrew categories to English keys...');
    
    const itemsToMigrate = await GalleryItem.find({ category: { $in: Object.keys(categoryMap) } });

    if (itemsToMigrate.length === 0) {
      console.log('No items with old Hebrew categories found to migrate.');
      await mongoose.disconnect();
      return;
    }

    console.log(`Found ${itemsToMigrate.length} items to process.`);
    let migratedCount = 0;

    for (const item of itemsToMigrate) {
      const oldCategory = item.category;
      const newKey = categoryMap[oldCategory];
      
      if (newKey) {
        item.category = newKey;
        await item.save();
        console.log(`Migrated item "${item.title || item._id}" from "${oldCategory}" to "${newKey}"`);
        migratedCount++;
      }
    }
    
    console.log(`\nMigration complete. Migrated ${migratedCount} items successfully.`);

  } catch (error) {
    console.error('An error occurred during migration:', error);
  } finally {
    if (mongoose.connection.readyState === 1) {
      console.log('Disconnecting from DB.');
      await mongoose.disconnect();
    }
    process.exit(0);
  }
};

migrate();