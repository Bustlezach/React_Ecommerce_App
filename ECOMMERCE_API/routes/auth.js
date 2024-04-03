const router = require("express").Router();
const { getDb } = require("../db");

//REGISTER
router.post("/register", (request, response) => {

  const { username, password, email } = request.body;
  const db = getDb();
  const newUser = {
      username,
      password,
      email,
    };

    if (!username || !password || !email) {
      return response.status(400).send("All fields are required. Fill all fields and retry.");
    }

  db.collection("Users")
    .insertOne(newUser)
    .then((doc) => {
      response.status(201).send(doc);
    })
    .catch(err => {
      response.status(500).json({
        Error: err, 
      })
    })

  // response.send(newUser);

});


module.exports = router