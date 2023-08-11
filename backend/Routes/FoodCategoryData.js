const express = require("express");
const router = express.Router();
const FoodCategory = require("../models/FoodCategory");

router.get("/foodCategory", async (req, res) => {
  try {
    const data = global.foodCategory;

    if (!data || data.length === 0) {
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
    const newCategory = new FoodCategory({
      CategoryName: req.body.CategoryName,
    });

    await newCategory.save(); // Save to the MongoDB collection
    global.foodCategory.push(newCategory); // Update global.foodCategory array

    res.json({ success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server Error" });
  }
});

router.delete("/foodCategory/:id", async (req, res) => {
  const categoryId = req.params.id;
  try {
    const deletedCategory = await FoodCategory.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    global.foodCategory = global.foodCategory.filter(
      (category) => category._id.toString() !== categoryId
    );

    res.json({ success: true, data: "Category Deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
