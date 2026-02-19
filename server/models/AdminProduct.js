import mongoose from 'mongoose';

const adminProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a product title'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Please add a product description'],
      maxlength: [2000, 'Description cannot exceed 2000 characters']
    },
    price: {
      type: Number,
      required: [true, 'Please add a product price'],
      min: [0, 'Price cannot be negative']
    },
    mrp: {
      type: Number,
      default: null,
      min: [0, 'MRP cannot be negative']
    },
    retailPrice: {
      type: Number,
      default: null,
      min: [0, 'Retail price cannot be negative']
    },
    discount: {
      type: {
        discountType: {
          type: String,
          enum: ['percentage', 'fixed'],
          default: 'percentage'
        },
        discountValue: {
          type: Number,
          default: 0,
          min: [0, 'Discount cannot be negative']
        }
      },
      default: {}
    },
    showPriceInListing: {
      type: Boolean,
      default: true
    },
    category: {
      type: String,
      required: [true, 'Please add a product category'],
      trim: true
    },
    quantity: {
      type: Number,
      required: [true, 'Please add product quantity'],
      min: [0, 'Quantity cannot be negative']
    },
    images: {
      type: [String],
      required: [true, 'Please add at least one image URL'],
      validate: {
        validator: function(v) {
          return v && v.length > 0;
        },
        message: 'At least one image URL is required'
      }
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, 'Rating must be at least 0'],
      max: [5, 'Rating cannot exceed 5']
    },
    reviewCount: {
      type: Number,
      default: 0,
      min: [0, 'Review count cannot be negative']
    },
    reviews: [
      {
        id: String,
        userId: String,
        userName: String,
        rating: Number,
        title: String,
        comment: String,
        date: String,
        helpful: Number
      }
    ],
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
    },
    isActive: {
      type: Boolean,
      default: true
    },
    published: {
      type: Boolean,
      default: false,
      index: true
    },
    // B2B Showroom fields
    material: {
      type: String,
      trim: true,
      enum: ['Tiles', 'Marble', 'Granite', 'Ceramic', 'Porcelain', 'Natural Stone', 'Bathroom Fittings', 'Other'],
      default: 'Tiles'
    },
    finish: {
      type: String,
      enum: ['Glossy', 'Matte', 'Polish', 'Textured', 'Honed'],
      default: 'Glossy'
    },
    sizes: {
      type: [String],
      default: [],
      // e.g., ["2x2", "4x2", "6x4"]
    },
    color: {
      type: String,
      trim: true,
      default: ''
    },
    specifications: {
      type: {
        thickness: String,
        weight: String,
        waterAbsorption: String,
        mohs: String,
        // Add common tile specs here
      },
      default: {}
    }
  },
  { timestamps: true }
);

export default mongoose.model('AdminProduct', adminProductSchema);
