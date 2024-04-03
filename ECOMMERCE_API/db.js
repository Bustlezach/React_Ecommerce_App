const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config();

let dbConnection;

module.exports = {
  connectToDb: (cb) => {
    mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      dbConnection = mongoose.connection;
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

