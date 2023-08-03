const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");

router.post("/orderData", async (req, res) => {
  const { order_date, order_data, email } = req.body;

  try {
    let eId = await Order.findOne({ email });

    if (eId === null) {
      try {
        await Order.create({
          email,
          order_data: [{ Order_date: order_date }, ...order_data],
        });
        res.json({ success: true });
      } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error: " + error.message);
      }
    } else {
      try {
        await Order.findOneAndUpdate(
          { email },
          { $push: { order_data: { Order_date: order_date, ...order_data } } }
        );
        res.json({ success: true });
      } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error: " + error.message);
      }
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error: " + error.message);
  }
});

router.post("/myorderData", async (req, res) => {
  try {
    let myData = await Order.findOne({ email: req.body.email });
    if (myData) {
      res.json({ orderData: myData });
    } else {
      res.json({ orderData: null });
    }
  } catch (error) {
    res.status(500).send("Server Error: " + error.message);
  }
});

module.exports = router;
