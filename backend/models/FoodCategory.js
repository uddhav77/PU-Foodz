const mongoose = require("mongoose");

const { Schema } = mongoose;
const data = global.foodCategory;
const CategorySchema = new Schema({
  CategoryName: {
    type: String,
  },
});

module.exports = mongoose.model(`${data}`, CategorySchema);
