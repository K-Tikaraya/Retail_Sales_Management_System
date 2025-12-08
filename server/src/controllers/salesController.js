const Sale = require('../models/Sale');

// @desc    Get List of Unique Tags (For the Dropdown)
// @route   GET /api/sales/tags
const getUniqueTags = async (req, res) => {
    try {
        // 1. Get all tag strings (e.g. ["organic,skincare", "beauty,makeup"])
        const rawTags = await Sale.distinct('Tags');
        
        // 2. Split them and clean them up
        const uniqueTags = new Set();
        rawTags.forEach(tagString => {
            if (tagString) {
                // Split "organic, skincare" into "organic" and "skincare"
                tagString.split(',').forEach(tag => uniqueTags.add(tag.trim()));
            }
        });

        // 3. Send alphabetical list
        res.status(200).json(Array.from(uniqueTags).sort());
    } catch (error) {
        res.status(500).json({ message: "Error fetching tags" });
    }
};

// @desc    Get Sales with Multi-Select Filters
// @route   GET /api/sales
const getSales = async (req, res) => {
    try {
        const { 
            search, region, gender, ageRange, category, 
            tags, paymentMethod, dateRange, sortBy, 
            page = 1, limit = 10 
        } = req.query;

        const query = {};

        // 1. Search (Name OR Phone)
        if (search) {
            query.$or = [
                { CustomerName: { $regex: search, $options: 'i' } },
                { PhoneNumber: { $regex: search, $options: 'i' } }
            ];
        }

        // 2. Multi-Select Filters (Region, Gender, etc.)
        if (region)  query.CustomerRegion = { $in: region.split(',') };
        if (gender)  query.Gender = { $in: gender.split(',') };
        if (category) query.ProductCategory = { $in: category.split(',') };
        if (paymentMethod) query.PaymentMethod = { $in: paymentMethod.split(',') };

        // 3. TAGS MULTI-SELECT (Crucial Part)
        // If user selects "Organic" and "Wireless", we find rows containing EITHER.
        if (tags) {
            // Convert "organic,wireless" -> "organic|wireless" (Regex OR)
            const tagRegex = tags.split(',').map(t => t.trim()).join('|');
            query.Tags = { $regex: tagRegex, $options: 'i' };
        }

        // 4. Ranges
        if (ageRange) {
            if (ageRange === '50+') query.Age = { $gte: 50 };
            else {
                const [min, max] = ageRange.split('-');
                if (min && max) query.Age = { $gte: Number(min), $lte: Number(max) };
            }
        }

        if (dateRange) {
            const today = new Date();
            const target = new Date(today);
            if (dateRange === 'last_7_days') target.setDate(today.getDate() - 7);
            else if (dateRange === 'last_30_days') target.setDate(today.getDate() - 30);
            query.Date = { $gte: target };
        }

        // 5. Sorting & Pagination
        let sortOptions = { Date: -1 };
        if (sortBy === 'quantity_desc') sortOptions = { Quantity: -1 };
        if (sortBy === 'name_asc') sortOptions = { CustomerName: 1 };

        const pageNum = Number(page);
        const limitNum = Number(limit);
        const skip = (pageNum - 1) * limitNum;

        const sales = await Sale.find(query).sort(sortOptions).skip(skip).limit(limitNum);
        const total = await Sale.countDocuments(query);

        res.json({ sales, total, page: pageNum, pages: Math.ceil(total / limitNum) });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = { getSales, getUniqueTags };