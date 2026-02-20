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
  heroCategoryImages: {
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

  // ===================== CATALOG FILTER CONFIG =====================
  catalogFilterConfig: {
    type: [{
      key: { type: String, required: true },
      label: { type: String, required: true },
      icon: { type: String, default: '🏷️' },
      enabled: { type: Boolean, default: true },
      displayOrder: { type: Number, default: 0 }
    }],
    default: [
      { key: 'category', label: 'Categories', icon: '📂', enabled: true, displayOrder: 0 },
      { key: 'material', label: 'Material', icon: '🏷️', enabled: true, displayOrder: 1 },
      { key: 'finish', label: 'Finish', icon: '✨', enabled: true, displayOrder: 2 },
      { key: 'size', label: 'Size', icon: '📐', enabled: true, displayOrder: 3 },
      { key: 'color', label: 'Color', icon: '🎨', enabled: true, displayOrder: 4 },
      { key: 'price', label: 'Price Range', icon: '💰', enabled: true, displayOrder: 5 },
      { key: 'rating', label: 'Min. Rating', icon: '⭐', enabled: true, displayOrder: 6 }
    ]
  },

  // ===================== INQUIRY FORM CONFIG =====================
  inquiryFormFields: {
    type: [{
      fieldName: { type: String, required: true },
      label: { type: String, required: true },
      type: { type: String, enum: ['text', 'email', 'tel', 'number', 'textarea', 'select'], default: 'text' },
      required: { type: Boolean, default: false },
      enabled: { type: Boolean, default: true },
      placeholder: { type: String, default: '' },
      options: { type: [String], default: [] },
      displayOrder: { type: Number, default: 0 }
    }],
    default: [
      { fieldName: 'name', label: 'Your Name', type: 'text', required: true, enabled: true, placeholder: 'Full name', options: [], displayOrder: 0 },
      { fieldName: 'email', label: 'Email Address', type: 'email', required: true, enabled: true, placeholder: 'your@email.com', options: [], displayOrder: 1 },
      { fieldName: 'phone', label: 'Phone Number', type: 'tel', required: true, enabled: true, placeholder: '+91 98765 43210', options: [], displayOrder: 2 },
      { fieldName: 'quantity', label: 'Quantity Required', type: 'number', required: true, enabled: true, placeholder: 'e.g., 100', options: [], displayOrder: 3 },
      { fieldName: 'quantityUnit', label: 'Unit', type: 'select', required: false, enabled: true, placeholder: '', options: ['Units', 'Pieces', 'Sets', 'Kg', 'Boxes'], displayOrder: 4 },
      { fieldName: 'message', label: 'Additional Message / Requirements', type: 'textarea', required: false, enabled: true, placeholder: 'Tell us more about your project or requirements...', options: [], displayOrder: 5 }
    ]
  },
  inquiryFormTitle: {
    type: String,
    default: 'Request Quote / Inquiry'
  },
  showWhatsAppButton: {
    type: Boolean,
    default: true
  },
  showCallButton: {
    type: Boolean,
    default: true
  },
  showSqftCalculator: {
    type: Boolean,
    default: false
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
