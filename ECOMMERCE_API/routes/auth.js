const router = require("express").Router();
const User = require("../models/User");

//REGISTER
router.post("/register", async (request, response) => {
  const { username, password, email } = request.body;
  const newUser = new User(
    {
      username,
      password,
      email,
    }
  );

  // response.send(newUser);

  try{
    const savedUser = await newUser.save({ timeout: 15000 });
    response.status(200).json(savedUser);
  } catch(err) {
    response.status(500).json({error: err.message});
  }
});


module.exports = router