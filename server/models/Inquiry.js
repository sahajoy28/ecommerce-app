import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email'
      ]
    },
    phone: {
      type: String,
      required: [true, 'Please provide your phone number'],
      trim: true
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AdminProduct',
      required: true
    },
    productName: {
      type: String,
      required: true
    },
    quantity: {
      type: String,
      required: true
    },
    quantityUnit: {
      type: String,
      default: 'units',
      enum: ['units', 'pieces', 'sets', 'kg', 'boxes']
    },
    message: {
      type: String,
      trim: true,
      default: ''
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'quote-sent', 'closed'],
      default: 'new',
      index: true
    },
    notes: {
      type: String,
      default: ''
    },
    createdAt: {
      type: Date,
      default: Date.now,
      index: true
    },
    updatedAt: {
      type: Date,
      default: Date.now
    },
    isArchived: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

// Index for efficient querying
inquirySchema.index({ email: 1, productId: 1 });
inquirySchema.index({ createdAt: -1 });

export default mongoose.model('Inquiry', inquirySchema);
