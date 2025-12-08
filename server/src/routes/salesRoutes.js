// backend/src/routes/salesRoutes.js
const express = require('express');
const router = express.Router();
const { getSales, getUniqueTags } = require('../controllers/salesController');

// 1. Route to get the list of Tags (Must be first!)
router.get('/tags', getUniqueTags);

// When user visits /api/sales, run the 'getSales' logic
router.get('/', getSales);

module.exports = router;