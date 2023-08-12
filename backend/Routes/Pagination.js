const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");
const FoodMenu = require("../models/FoodMenu");

router.get("/paginatedUser", async(req, res) => {
    const allOrders = await Order.find({});
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const startIndex = (page - 1) * limit
    const lastIndex = (page) * limit

    const results = {}
    results.totalOrder = allOrders.length
    results.pageCount = Math.ceil(allOrders.length / limit)
    if (lastIndex < allOrders.length) {

        results.next = {
            page: page + 1
        }
    }
    if (startIndex > 0) {
        results.prev = {
            page: page - 1
        }
    }
    results.result = allOrders.slice(startIndex, lastIndex)
    res.json(results);
});

;

router.get("/paginatedMenu", async(req, res) => {
    try {
        const data = global.food_items;

        if (!data || !Array.isArray(data)) {
            return res.status(500).json({ error: 'Food items data is missing or not an array.' });
        }

        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const startIndex = (page - 1) * limit;
        const lastIndex = page * limit;

        const result = data.slice(startIndex, lastIndex);

        const paginatedData = {
            currentPage: page,
            itemsPerPage: limit,
            totalItems: data.length,
            pageCount: Math.ceil(data.length / limit),
            data: result
        };

        res.json(paginatedData);
    } catch (error) {
        console.error('Error in paginatedMenu:', error);
        res.status(500).json({ error: 'An internal server error occurred.' });
    }
});

module.exports = router;













module.exports = router;