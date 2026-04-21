const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  name: String,
  price: Number,
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  image: String,
});

const orderSchema = new mongoose.Schema({
  // Customer info
  customerName: {
    type: String,
    required: [true, 'Customer name is required'],
  },
  customerEmail: {
    type: String,
    required: [true, 'Customer email is required'],
  },
  customerPhone: {
    type: String,
    required: [true, 'Customer phone is required'],
  },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    pincode: String,
  },
  products: [orderItemSchema],
  totalAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending',
  },
  razorpayOrderId: {
    type: String,
  },
  razorpayPaymentId: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
