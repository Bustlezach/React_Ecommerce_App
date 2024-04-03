const router = require("express").Router();
const { ObjectId } = require("mongodb");
const {getDb} = require("../db");


router.get("/", (req, res) => {
  const db = getDb();
  const users = [];

  db.collection("users")
    .find()
    .sort({username: 1})
    .forEach(user => users.push(user))
    .then(() => {
      res.status(200).send(users)
    })
    .catch(err => {
      res.status(500).json({
        Error: "Could not fetch the documents.",
        message: err,
      })
    })
})

router.get("/:id", (req, res) => {
  const db = getDb();
  if(!ObjectId.isValid(req.params.id)) {
    response.status(404).json({
      Error: "The Id you've provided is not valid."
    })
  }

  db.collection("users")
    .findOne({_id: new ObjectId(req.params.id)})
    .then((doc) => {
      res.status(200).send(doc)
    })
    .catch(() => {
      res.status(500).send("Could not find user.")
    })
})




module.exports = router