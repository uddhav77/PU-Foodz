const express = require("express");
const app = express();
const port = 7000;
const mongoDB = require("./db");

mongoDB();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));
app.use("/api", require("./Routes/FoodData"));
app.use("/api", require("./Routes/FoodCategoryData"));
app.use("/api", require("./Routes/FoodMenuData"));
app.use("/api", require("./Routes/Pagination"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
