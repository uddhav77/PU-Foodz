const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://uddhav7:Meronaldo7@cluster0.ppe8whi.mongodb.net/goFood?retryWrites=true&w=majority";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true });
    console.log("Connected successfully to MongoDB");

    // Fetch data from the "food_items" collection
    const foodItemsCollection = mongoose.connection.db.collection("food_items");
    const foodItemsData = await foodItemsCollection.find({}).toArray();

    // Fetch data from the "foodCategory" collection
    const foodCategoryCollection =
      mongoose.connection.db.collection("foodCategory");
    const foodCategoryData = await foodCategoryCollection.find({}).toArray();

    // Assign the data to global variables for access in other parts of the application
    global.food_items = foodItemsData;
    global.foodCategory = foodCategoryData;
  } catch (error) {
    console.error("Connection to MongoDB failed:", error);
  }
};

module.exports = connectToMongoDB;
