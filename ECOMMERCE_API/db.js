const { MongoClient } = require("mongodb");
const dotenv = require('dotenv');


dotenv.config();

let dbConnection;

module.exports = {
  connectToDb: (cb) => {
    MongoClient
    .connect(process.env.MONGO_URL)
    .then((client) => {
      dbConnection = client.db();
      console.log("Db connection is successful!");
      return cb();
    })
    .catch((err) => {
      console.error('Error connecting to database:', err);
      return cb(err);
    })
  },
  getDb: () => dbConnection,
}

