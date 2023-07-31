const { ObjectId } = require("mongodb");
const express = require("express");
const router = express.Router();

router.get("/foodData/:id", (req, res) => {
  try {
    const itemId = req.params.id;
    const item = global.food_items.find(
      (item) => item._id.toString() === itemId
    );

    if (item) {
      res.send(item.description);
    } else {
      res.status(404).send("Item not found.");
    }
  } catch (error) {
    console.error(error.message);
    res.send("Server Error");
  }
});

module.exports = router;
