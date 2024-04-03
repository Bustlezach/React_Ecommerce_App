const express = require("express");
const app = express();
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const { connectToDb, getDb } = require("./db");


let db;

connectToDb((err) => {
  if (!err) {
    app.listen(process.env.PORT, () => {
      console.log("App running!");
      console.log("App listening on port: " + process.env.PORT);
      console.log("Terminate App with 'CTRL + C'");
    });
    db = getDb();
  }
})

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

