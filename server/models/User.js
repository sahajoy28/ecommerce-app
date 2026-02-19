import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const addressSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: {
    type: String,
    required: true
  },
  city: String,
  state: String,
  zip: String,
  isDefault: {
    type: Boolean,
    default: false
  }
}, { _id: true });

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true
  },
  productName: String,
  price: Number,
  quantity: {
    type: Number,
    required: true,
    default: 1,
    min: 1
  },
  image: String,
  addedAt: {
    type: Date,
    default: Date.now
  }
}, { _id: true });

const wishlistItemSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true
  },
  productName: String,
  price: Number,
  image: String,
  addedAt: {
    type: Date,
    default: Date.now
  }
}, { _id: true });

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      trim: true,
      maxlength: [50, 'Name cannot exceed 50 characters']
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email'
      ]
    },
    phone: {
      type: String,
      default: ''
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other', ''],
      default: ''
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false // Don't return password by default
    },
    addresses: [addressSchema],
    cart: [cartItemSchema],
    wishlist: [wishlistItemSchema],
    preferences: {
      theme: {
        type: String,
        enum: ['light', 'dark'],
        default: 'light'
      },
      accentColor: {
        type: String,
        enum: ['blue', 'orange', 'purple', 'green', 'red'],
        default: 'blue'
      }
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', userSchema);
