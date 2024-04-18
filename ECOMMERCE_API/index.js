const express = require("express");
const app = express();
const userRoute = require("./routes/User");
const authRoute = require("./routes/Auth");
const productsRoute = require("./routes/Products");
const cartRoute = require("./routes/Cart");
const orderRoute = require("./routes/Order");
const { connectToDb, getDb } = require("./db");



// Db connection
let db;
const PORT = process.env.PORT || 27017;

connectToDb((err) => {
  if (!err) {
    db = getDb();
    app.listen(PORT, () => {
      console.log("App running!");
      console.log("App listening on port: " + PORT);
      console.log("Terminate App with 'CTRL + C'");
    });
  }
})


// middleware and routes
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/products", productsRoute);
app.use("/api/users", userRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);


app.get("/api", (req, res) => {
  res.status(200).send("Welcome to my shop API ✨🎉🏎")
})
