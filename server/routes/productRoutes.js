const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Product = require('../models/Product');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');
const path = require('path');

// GET /api/products - Get all products
router.get('/', async (req, res) => {
  try {
    const { category, search, sort } = req.query;
    let query = {};

    // Filter by category
    if (category) query.category = category;

    // Search by name/description
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    let productsQuery = Product.find(query);

    // Sort options
    if (sort === 'price_asc') productsQuery = productsQuery.sort({ price: 1 });
    else if (sort === 'price_desc') productsQuery = productsQuery.sort({ price: -1 });
    else if (sort === 'rating') productsQuery = productsQuery.sort({ rating: -1 });
    else productsQuery = productsQuery.sort({ createdAt: -1 });

    const products = await productsQuery;
    res.json(products);
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/products/:id - Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid product ID' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/products - Create product (admin only)
router.post(
  '/',
  protect,
  upload.array('images', 10),
  [
    body('name').notEmpty().withMessage('Product name is required'),
    body('price').isNumeric().withMessage('Price must be a number').isFloat({ min: 0 }),
    body('description').notEmpty().withMessage('Description is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, price, description, rating, category, stock } = req.body;

      // Parse specifications (sent as JSON string or key-value pairs)
      let specifications = {};
      if (req.body.specifications) {
        try {
          specifications = JSON.parse(req.body.specifications);
        } catch (e) {
          specifications = {};
        }
      }

      // Build image URLs from uploads
      const images = req.files
        ? req.files.map((file) => `/uploads/${file.filename}`)
        : [];

      const product = new Product({
        name,
        price,
        description,
        images,
        rating: rating || 0,
        specifications,
        category: category || 'General',
        stock: stock || 0,
      });

      const savedProduct = await product.save();
      res.status(201).json(savedProduct);
    } catch (error) {
      console.error('Create product error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// PUT /api/products/:id - Update product (admin only)
router.put('/:id', protect, upload.array('images', 10), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const { name, price, description, rating, category, stock, existingImages } = req.body;

    // Merge existing images (kept) with new uploads
    let images = [];
    if (existingImages) {
      images = Array.isArray(existingImages) ? existingImages : [existingImages];
    }
    if (req.files && req.files.length > 0) {
      images = [...images, ...req.files.map((file) => `/uploads/${file.filename}`)];
    }

    // Parse specifications
    let specifications = product.specifications;
    if (req.body.specifications) {
      try {
        specifications = JSON.parse(req.body.specifications);
      } catch (e) {}
    }

    product.name = name || product.name;
    product.price = price !== undefined ? price : product.price;
    product.description = description || product.description;
    product.images = images.length > 0 ? images : product.images;
    product.rating = rating !== undefined ? rating : product.rating;
    product.specifications = specifications;
    product.category = category || product.category;
    product.stock = stock !== undefined ? stock : product.stock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/products/:id - Delete product (admin only)
router.delete('/:id', protect, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await product.deleteOne();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
