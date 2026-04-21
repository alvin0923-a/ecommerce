const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  images: {
    type: [String],
    default: [],
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  specifications: {
    type: Map,
    of: String,
    default: {},
  },
  category: {
    type: String,
    default: 'General',
    trim: true,
  },
  stock: {
    type: Number,
    default: 0,
    min: 0,
  },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
