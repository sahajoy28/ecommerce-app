import mongoose from 'mongoose';

const filterOptionSchema = new mongoose.Schema({
  label: { type: String, required: true, trim: true },
  value: { type: String, required: true, trim: true },
}, { _id: false });

const customFilterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Filter name is required'],
    trim: true,
    unique: true
  },
  slug: {
    type: String,
    unique: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['checkbox', 'select', 'range'],
    default: 'checkbox'
  },
  options: {
    type: [filterOptionSchema],
    default: []
  },
  // For range type
  rangeMin: { type: Number, default: 0 },
  rangeMax: { type: Number, default: 100 },
  rangeUnit: { type: String, default: '' },
  icon: { type: String, default: '🔖' },
  displayOrder: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  showInSidebar: { type: Boolean, default: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Auto-generate slug from name
customFilterSchema.pre('save', function (next) {
  if (this.isModified('name') || !this.slug) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
  next();
});

const CustomFilter = mongoose.model('CustomFilter', customFilterSchema);
export default CustomFilter;
