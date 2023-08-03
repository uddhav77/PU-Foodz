const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");

// Create or update order data
router.post("/orderData", async (req, res) => {
  const { order_date, order_data, email } = req.body;

  try {
    let existingOrder = await Order.findOne({ email });

    if (!existingOrder) {
      // If order data doesn't exist for the email, create a new document
      await Order.create({
        email,
        order_data: [{ Order_date: order_date, ...order_data }],
      });
    } else {
      // If order data exists, update the existing document with the new order data
      existingOrder.order_data.push({ Order_date: order_date, ...order_data });
      await existingOrder.save();
    }

    res.json({ success: true });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error: " + error.message);
  }
});

// Get order data for a specific user
router.post("/myorderData", async (req, res) => {
  try {
    const { email } = req.body;
    let myData = await Order.findOne({ email });

    if (myData) {
      res.json({ orderData: myData.order_data });
    } else {
      res.json({ orderData: [] }); // Return an empty array if no order data is found
    }
  } catch (error) {
    res.status(500).send("Server Error: " + error.message);
  }
});

module.exports = router;
