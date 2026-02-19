import mongoose from 'mongoose';

const siteSettingsSchema = new mongoose.Schema({
  // Map settings
  mapEmbedUrl: {
    type: String,
    default: ''
  },
  mapLatitude: {
    type: Number,
    default: null
  },
  mapLongitude: {
    type: Number,
    default: null
  },
  mapZoom: {
    type: Number,
    default: 15,
    min: 1,
    max: 21
  },

  // Business contact info
  businessName: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    default: ''
  },
  whatsappNumber: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },

  // About page content
  aboutTitle: {
    type: String,
    default: 'About Us'
  },
  aboutSubtitle: {
    type: String,
    default: ''
  },
  aboutStory: {
    type: String,
    default: ''
  },
  aboutOfferings: {
    type: String,
    default: ''
  },
  aboutCategories: {
    type: [String],
    default: []
  },
  aboutBrands: {
    type: [String],
    default: []
  },
  aboutShowroom: {
    type: String,
    default: ''
  },
  aboutWhyChooseUs: {
    type: String,
    default: ''
  },
  aboutShowroomImages: {
    type: [String],
    default: []
  },

  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Ensure only one settings document exists (singleton)
siteSettingsSchema.statics.getSettings = async function () {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({});
  }
  return settings;
};

const SiteSettings = mongoose.model('SiteSettings', siteSettingsSchema);
export default SiteSettings;
