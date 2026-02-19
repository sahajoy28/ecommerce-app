import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a banner title'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
      default: ''
    },
    imageUrl: {
      type: String,
      required: [true, 'Please add a banner image URL'],
      trim: true
    },
    link: {
      type: String,
      trim: true,
      default: ''
    },
    position: {
      type: Number,
      default: 0,
      min: [0, 'Position cannot be negative']
    },
    type: {
      type: String,
      enum: ['hero', 'promotional', 'featured', 'category'],
      default: 'promotional'
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true
    },
    startDate: {
      type: Date,
      default: Date.now
    },
    endDate: {
      type: Date,
      default: null
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

// Index for efficient querying
bannerSchema.index({ isActive: 1, position: 1 });
bannerSchema.index({ type: 1, isActive: 1 });

export default mongoose.model('Banner', bannerSchema);
