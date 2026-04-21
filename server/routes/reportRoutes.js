const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { protect } = require('../middleware/auth');

// GET /api/reports/daily - Daily sales for current month
router.get('/daily', protect, async (req, res) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    const dailySales = await Order.aggregate([
      {
        $match: {
          paymentStatus: 'paid',
          date: { $gte: startOfMonth, $lte: endOfMonth },
        },
      },
      {
        $group: {
          _id: { $dayOfMonth: '$date' },
          totalRevenue: { $sum: '$totalAmount' },
          orderCount: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Fill in missing days with 0
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const fullData = Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const found = dailySales.find((d) => d._id === day);
      return {
        day,
        totalRevenue: found ? found.totalRevenue : 0,
        orderCount: found ? found.orderCount : 0,
      };
    });

    res.json({ period: 'daily', data: fullData });
  } catch (error) {
    console.error('Daily report error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/reports/monthly - Monthly sales for current year
router.get('/monthly', protect, async (req, res) => {
  try {
    const year = parseInt(req.query.year) || new Date().getFullYear();
    const startOfYear = new Date(year, 0, 1);
    const endOfYear = new Date(year, 11, 31, 23, 59, 59);

    const monthlySales = await Order.aggregate([
      {
        $match: {
          paymentStatus: 'paid',
          date: { $gte: startOfYear, $lte: endOfYear },
        },
      },
      {
        $group: {
          _id: { $month: '$date' },
          totalRevenue: { $sum: '$totalAmount' },
          orderCount: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];

    const fullData = months.map((month, i) => {
      const found = monthlySales.find((m) => m._id === i + 1);
      return {
        month,
        totalRevenue: found ? found.totalRevenue : 0,
        orderCount: found ? found.orderCount : 0,
      };
    });

    res.json({ period: 'monthly', year, data: fullData });
  } catch (error) {
    console.error('Monthly report error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/reports/yearly - Yearly sales (last 5 years)
router.get('/yearly', protect, async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 4;

    const yearlySales = await Order.aggregate([
      {
        $match: {
          paymentStatus: 'paid',
          date: { $gte: new Date(`${startYear}-01-01`) },
        },
      },
      {
        $group: {
          _id: { $year: '$date' },
          totalRevenue: { $sum: '$totalAmount' },
          orderCount: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const fullData = Array.from({ length: 5 }, (_, i) => {
      const year = startYear + i;
      const found = yearlySales.find((y) => y._id === year);
      return {
        year,
        totalRevenue: found ? found.totalRevenue : 0,
        orderCount: found ? found.orderCount : 0,
      };
    });

    res.json({ period: 'yearly', data: fullData });
  } catch (error) {
    console.error('Yearly report error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/reports/custom?start=DATE&end=DATE - Custom date range
router.get('/custom', protect, async (req, res) => {
  try {
    const { start, end } = req.query;

    if (!start || !end) {
      return res.status(400).json({ message: 'Start and end dates are required' });
    }

    const startDate = new Date(start);
    const endDate = new Date(end);
    endDate.setHours(23, 59, 59, 999);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return res.status(400).json({ message: 'Invalid date format' });
    }

    const customSales = await Order.aggregate([
      {
        $match: {
          paymentStatus: 'paid',
          date: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' },
            day: { $dayOfMonth: '$date' },
          },
          totalRevenue: { $sum: '$totalAmount' },
          orderCount: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } },
    ]);

    const data = customSales.map((item) => ({
      date: `${item._id.year}-${String(item._id.month).padStart(2, '0')}-${String(item._id.day).padStart(2, '0')}`,
      totalRevenue: item.totalRevenue,
      orderCount: item.orderCount,
    }));

    // Calculate totals
    const summary = {
      totalRevenue: data.reduce((sum, d) => sum + d.totalRevenue, 0),
      totalOrders: data.reduce((sum, d) => sum + d.orderCount, 0),
    };

    res.json({ period: 'custom', start, end, data, summary });
  } catch (error) {
    console.error('Custom report error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/reports/summary - Dashboard summary stats
router.get('/summary', protect, async (req, res) => {
  try {
    const [totalRevenue, totalOrders, totalProducts] = await Promise.all([
      Order.aggregate([
        { $match: { paymentStatus: 'paid' } },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } },
      ]),
      Order.countDocuments({ paymentStatus: 'paid' }),
      require('../models/Product').countDocuments(),
    ]);

    res.json({
      totalRevenue: totalRevenue[0]?.total || 0,
      totalOrders,
      totalProducts,
    });
  } catch (error) {
    console.error('Summary error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
