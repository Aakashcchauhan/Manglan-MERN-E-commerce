const mongoose = require("mongoose");

// Define size schema
const sizeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  inStock: {
    type: Boolean,
    required: true,
    default: true,
  },
});

// Define color schema
const colorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  hexCode: {
    type: String,
    trim: true,
  },
});

// Define product schema
const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    sizes: {
      type: [sizeSchema], // Array of size objects
      default: [],
    },
    colors: {
      type: [colorSchema], // Array of color objects
      default: [],
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String, // URL or file path
      required: false,
    },
    tags: {
      type: [String], // Array of tags
      default: [],
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

ProductSchema.pre('save', function(next) {
  if (this.isModified('sizes') && Array.isArray(this.sizes) && this.sizes.length > 0 && typeof this.sizes[0] === 'string') {
    this.sizes = this.sizes.map(size => ({ name: size, inStock: true }));
  }
  if (this.isModified('colors') && Array.isArray(this.colors) && this.colors.length > 0 && typeof this.colors[0] === 'string') {
    this.colors = this.colors.map(color => ({ name: color, hexCode: '' }));
  }
  next();
});

module.exports = mongoose.model("Product", ProductSchema);