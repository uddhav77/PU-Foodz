const express = require("express");
const router = express.Router();
const Category = require("../models/FoodCategory");

router.get("/foodCategory", async (req, res) => {
  try {
    const data = global.foodCategory;

    if (!data) {
      return res.status(404).json({ error: "Food categories not found" });
    }

    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server Error" });
  }
});

router.post("/foodCategory", async (req, res) => {
  try {
    const newCategory = {
      CategoryName: req.body.CategoryName,
    };
    // const data = global.foodCategory;

    await Category.create(newCategory);
    res.json({ success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
