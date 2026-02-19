import express from 'express';
import SiteSettings from '../models/SiteSettings.js';
import { verify } from '../middleware/auth.js';

const router = express.Router();

// GET /api/settings - Public: get site settings
router.get('/', async (req, res) => {
  try {
    const settings = await SiteSettings.getSettings();
    res.json({ success: true, data: settings });
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch settings' });
  }
});

// PUT /api/settings - Admin only: update site settings
router.put('/', verify, async (req, res) => {
  try {
    if (req.user?.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin access required' });
    }

    const allowedFields = [
      // General / Business
      'businessName', 'phone', 'whatsappNumber', 'email', 'address',
      // Theme
      'themeMode', 'accentColor',
      // Home page
      'heroTitle', 'heroSubtitle', 'heroCategories', 'heroCategoryIcons',
      'statsProducts', 'statsYears', 'statsClients', 'statsBrands',
      'testimonials',
      // About page
      'aboutTitle', 'aboutSubtitle', 'aboutStory', 'aboutOfferings',
      'aboutCategories', 'aboutBrands', 'aboutShowroom', 'aboutWhyChooseUs',
      'aboutShowroomImages',
      // Contact / Map
      'mapEmbedUrl', 'mapLatitude', 'mapLongitude', 'mapZoom',
      // Email / SMTP
      'smtpEmail', 'smtpAppPassword'
    ];

    const updates = {};
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }
    updates.updatedBy = req.userId;

    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create(updates);
    } else {
      Object.assign(settings, updates);
      await settings.save();
    }

    res.json({ success: true, data: settings, message: 'Settings updated successfully' });
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({ success: false, message: 'Failed to update settings' });
  }
});

export default router;
