const express = require("express");
const FoodMenu = require("../models/FoodMenu");
const router = express.Router();

// Assume global.food_items is your food data stored in the global state

// GET route to fetch food menu data
router.get("/foodMenu", async(req, res) => {
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

router.post("/foodMenu", async(req, res) => {
    try {
        const newFoodMenu = new FoodMenu({
            CategoryName: req.body.CategoryName,
            name: req.body.name,
            img: req.body.img,
            options: req.body.options,
            description: req.body.description,
        });

        await newFoodMenu.save(); // Save to the MongoDB collection
        global.food_items.push(newFoodMenu); // Update global.foodCategory array

        res.json({ success: true });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Server Error" });
    }
});


// PUT route to update a menu item
router.put("/foodMenu/:id", async(req, res) => {
    try {
        const itemId = req.params.id;

        // Check if global.food_items is defined and is an array
        if (!global.food_items || !Array.isArray(global.food_items)) {
            return res.status(500).send("Food items data is not properly initialized.");
        }

        // Convert the itemId to ObjectId type if it's stored as a string
        const ObjectId = require("mongoose").Types.ObjectId;
        const objectId = new ObjectId(itemId);

        // Find the index of the item to update
        const itemIndex = global.food_items.findIndex(item => item._id.toString() === objectId.toString());

        if (itemIndex !== -1) {
            // Update the item in the global state
            global.food_items[itemIndex] = {...global.food_items[itemIndex], ...req.body };
            res.send(global.food_items[itemIndex]);
        } else {
            res.status(404).send("Item not found.");
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

router.delete("/foodMenu/:id", async(req, res) => {
    const MenuId = req.params.id;
    try {
        const deletedMenu = await FoodMenu.findByIdAndDelete(MenuId);

        if (!deletedMenu) {
            return res.status(404).json({ error: "Food Menu not found" });
        }

        global.food_items = global.food_items.filter(
            (menu) => menu._id.toString() !== MenuId
        );

        res.json({ success: true, data: "Food Menu Deleted" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Server Error" });
    }
});




module.exports = router;