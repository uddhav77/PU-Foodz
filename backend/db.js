const mongoose = require("mongoose");

const mongoURI =
    "mongodb+srv://uddhav7:Meronaldo7@cluster0.ppe8whi.mongodb.net/goFood?retryWrites=true&w=majority";

const mongoDB = async() => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true });
        console.log("Connected successfully");

        // Fetch data from the "food_items" collection
        const collection = mongoose.connection.db.collection("food_items");
        const data = await collection.find({}).toArray();
        console.log();
    } catch (error) {
        console.error("Connection failed:", error);
    }
};

module.exports = mongoDB;