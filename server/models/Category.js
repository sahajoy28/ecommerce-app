import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    trim: true,
    unique: true
  },
  slug: {
    type: String,
    unique: true,
    trim: true
  },
  icon: {
    type: String,
    default: '📦'
  },
  image: {
    type: String,
    default: ''
  },
  gradient: {
    type: String,
    default: ''
  },
  displayOrder: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  showOnHome: {
    type: Boolean,
    default: true
  },
  isPredefined: {
    type: Boolean,
    default: false
  },
  appliedFilters: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CustomFilter'
  }],
  description: {
    type: String,
    default: ''
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Auto-generate slug from name
categorySchema.pre('save', function (next) {
  if (this.isModified('name') || !this.slug) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
  next();
});

// Seed predefined categories if none exist
categorySchema.statics.seedDefaults = async function () {
  const count = await this.countDocuments();
  if (count === 0) {
    const defaults = [
      { name: 'Electronics', icon: '📱', displayOrder: 1, isPredefined: true },
      { name: 'Fashion', icon: '👗', displayOrder: 2, isPredefined: true },
      { name: 'Home & Living', icon: '🏠', displayOrder: 3, isPredefined: true },
      { name: 'Sports & Outdoors', icon: '⚽', displayOrder: 4, isPredefined: true },
      { name: 'Beauty & Health', icon: '💄', displayOrder: 5, isPredefined: true },
      { name: 'Books & Stationery', icon: '📚', displayOrder: 6, isPredefined: true },
      { name: 'Kitchen & Dining', icon: '🍳', displayOrder: 7, isPredefined: true },
      { name: 'Toys & Games', icon: '🎮', displayOrder: 8, isPredefined: true },
    ];
    await this.insertMany(defaults);
    console.log('✅ Default categories seeded');
  }
};

const Category = mongoose.model('Category', categorySchema);
export default Category;
