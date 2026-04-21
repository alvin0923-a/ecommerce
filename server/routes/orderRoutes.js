const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const crypto = require('crypto');
const Razorpay = require('razorpay');
const Order = require('../models/Order');
const { protect } = require('../middleware/auth');

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// POST /api/orders - Create order + Razorpay order
router.post(
  '/',
  [
    body('customerName').notEmpty().withMessage('Customer name is required'),
    body('customerEmail').isEmail().withMessage('Valid email is required'),
    body('customerPhone').notEmpty().withMessage('Phone number is required'),
    body('products').isArray({ min: 1 }).withMessage('At least one product is required'),
    body('totalAmount').isNumeric().withMessage('Total amount must be a number'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const {
        customerName,
        customerEmail,
        customerPhone,
        shippingAddress,
        products,
        totalAmount,
      } = req.body;

      // Create Razorpay order
      const razorpayOrder = await razorpay.orders.create({
        amount: Math.round(totalAmount * 100), // Convert to paise
        currency: 'INR',
        receipt: `receipt_${Date.now()}`,
      });

      // Save order in DB with pending status
      const order = new Order({
        customerName,
        customerEmail,
        customerPhone,
        shippingAddress,
        products,
        totalAmount,
        paymentStatus: 'pending',
        razorpayOrderId: razorpayOrder.id,
      });

      const savedOrder = await order.save();

      res.status(201).json({
        order: savedOrder,
        razorpayOrderId: razorpayOrder.id,
        razorpayKeyId: process.env.RAZORPAY_KEY_ID,
      });
    } catch (error) {
      console.error('Create order error:', error);
      res.status(500).json({ message: 'Failed to create order', error: error.message });
    }
  }
);

// POST /api/orders/verify - Verify Razorpay payment
router.post('/verify', async (req, res) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

    // Generate expected signature
    const body = razorpayOrderId + '|' + razorpayPaymentId;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpaySignature) {
      return res.status(400).json({ message: 'Payment verification failed' });
    }

    // Update order status to paid
    const order = await Order.findOneAndUpdate(
      { razorpayOrderId },
      {
        paymentStatus: 'paid',
        razorpayPaymentId,
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ message: 'Payment verified successfully', order });
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ message: 'Server error during payment verification' });
  }
});

// GET /api/orders - Get all orders (admin only)
router.get('/', protect, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('products.product', 'name price images')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/orders/:id - Get single order (admin only)
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      'products.product',
      'name price images'
    );
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
