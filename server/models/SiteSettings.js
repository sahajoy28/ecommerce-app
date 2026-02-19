import mongoose from 'mongoose';

const siteSettingsSchema = new mongoose.Schema({
  // ===================== GENERAL / BUSINESS =====================
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

  // ===================== THEME / APPEARANCE =====================
  themeMode: {
    type: String,
    enum: ['light', 'dark'],
    default: 'light'
  },
  accentColor: {
    type: String,
    enum: ['blue', 'orange', 'purple', 'green', 'red'],
    default: 'blue'
  },

  // ===================== HOME PAGE =====================
  heroTitle: {
    type: String,
    default: ''
  },
  heroSubtitle: {
    type: String,
    default: ''
  },
  heroCategories: {
    type: [String],
    default: []
  },
  heroCategoryIcons: {
    type: [String],
    default: []
  },
  statsProducts: { type: String, default: '500+' },
  statsYears: { type: String, default: '15+' },
  statsClients: { type: String, default: '5000+' },
  statsBrands: { type: String, default: '50+' },
  testimonials: {
    type: [{
      text: String,
      author: String
    }],
    default: []
  },

  // ===================== ABOUT PAGE =====================
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

  // ===================== CONTACT / MAP =====================
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

  // ===================== EMAIL / SMTP =====================
  smtpEmail: {
    type: String,
    default: ''
  },
  smtpAppPassword: {
    type: String,
    default: ''
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
