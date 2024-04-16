const router = require("express").Router();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const { getDb } = require("../db");
let userId;

//REGISTER
router.post("/register", (request, response) => {
  const { username, password, email } = request.body;
  const db = getDb();
  const newUser = {
      username,
      password: CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString(),
      email,
      isAdmin: false,
      createdAt: getCurrentTimestamp(),
      updatedAt: getCurrentTimestamp(),
    };

    if (!username || !password || !email) {
      return response.status(400).send("All fields are required. Fill all fields and retry.");
    }

  db.collection("users")
    .insertOne(newUser)
    .then((user) => {
      if (user){
        const addedUser = {...user, ...newUser};
        response.status(201).send(addedUser);
      } else {
        response.status(401).send("User could not be found.");
      }
    })
    .catch(err => {
      response.status(500).json({
        Error: "outer error", 
      })
    })
});

router.post("/login", async (req, res) => {
  const db = getDb();
  try {
    const { username } = req.body;
    const user = await db.collection("users").findOne({username: username});
    if (!user) {
      res.status(401).send("Wrong credentials!")
    }
    const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
    const dbPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    if (dbPassword !== req.body.password) {
      res.status(401).send("Wrong credential! (password)");
    }
    console.log("Login successful ✨🎉😎");
    const {password, ...others} = user;

    const accessToken = jwt.sign({
        id: user._id,
        isAdmin: user.isAdmin,
      }, process.env.JWT_SEC,
      {expiresIn: "3d"}
    );

    res.status(200).send({...others, accessToken});
  } catch(err) {
    res.status(500).send(
      {Error: "Internal server error"}
    )
  }
})

module.exports = router