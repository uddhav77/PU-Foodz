const mongoose = require("mongoose");

const { Schema } = mongoose;
const MenuSchema = new Schema({
  CategoryName: {
    type: String,
  },
  name: {
    type: String,
  },
  img: {
    type: String,
  },
  options: [
    {
      half: {
        type: String,
      },
      full: {
        type: String,
      },
    },
  ],
  description: {
    type: String,
  },
});

const FoodMenu = mongoose.model("FoodMenu", MenuSchema);
module.exports = FoodMenu;
