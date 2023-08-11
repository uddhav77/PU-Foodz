const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");

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

module.exports = router;