const express = require("express");
const FoodMenu = require("../models/FoodMenu");
const router = express.Router();

// GET route to fetch food menu data
router.get("/foodMenu", async (req, res) => {
  try {
    const data = global.food_items;

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "Food categories not found" });
    }

    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server Error" });
  }
});

// PUT route to update a menu item

router.put("/foodMenu/:id", async (req, res) => {
  try {
    const data = global.food_items;
    const itemId = req.params.id;
    const item = await data.findByIdAndUpdate(itemId, req.body, {
      new: true,
    });

    if (item) {
      res.send(item);
    } else {
      res.status(404).send("Item not found.");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
