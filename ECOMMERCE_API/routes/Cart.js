const router = require("express").Router();


const { ObjectId } = require("mongodb");
const {getDb} = require("../db");
const { verify } = require("jsonwebtoken");
const {verifyToken, verifyTokenAuthorization, verifyTokenAndAdmin} = require("./verifyToken");



// CREATE 
router.post("/", verifyToken, async (req, res) => {
  const db = getDb();
  db.collection("cart")
    .insertOne(req.body)
    .then(doc => {
      if (!doc) {
        res.status(403).send("Document could not be added")
      }
      res.status(201).send(doc)
    })
    .catch(err => {
      res.status(500).send(err)
    })
})



// Edit Cart
router.put("/:id", verifyTokenAuthorization, async (req, res) => {
  const db = getDb();
 
 try{
  const updatedCart = await db.collection("cart")
  .findOneAndUpdate(
    {_id: new ObjectId(req.params.id)},
    {$set: { ...req.body, updatedAt: new Date() }},
    { returnDocument: 'after' }
  );

  if (!updatedCart) {
    res.status(404).send("cart not found")
  } 
  res.status(200).send(updatedCart);

 }
 catch(err) {
  console.error(err);
  res.status(500).send({message: "Internal server error"})
 }
});


// Delete
router.delete("/:id", verifyTokenAuthorization, async (req, res) => {
  const db = getDb();
  const data = await db.collection("cart").findOne({_id: new ObjectId(req.params.id)});
  if(!data) {
    res.status(403).send("Product cannot be found.")
  }
  db.collection("cart")
    .deleteOne({_id: new ObjectId(req.params.id)})
    .then(result => {
      res.status(200).send({
        result,
        message: "Cart has been deleted 🎱"
      });
    })
    .catch(err => {
      res.status(500).send({message: err});
    })
})


// GET USER CART
router.get("/:userId", verifyTokenAuthorization, (req, res) => {
  const db = getDb();

  db.collection("cart")
    .findOne({userId: new ObjectId(req.params.userId)})
    .then((cart) => {
      res.status(200).send({cart})
    })
    .catch(() => {
      res.status(500).send("Could not find product.")
    })
})

// GET ALL CART
router.get("/", verifyTokenAndAdmin, (req, res) => {
  const db = getDb();

  db.collection("cart")
    .find()
    .toArray()
    .then((carts) => {
      res.status(200).send(carts)
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("An error occurred while fetching the carts.");
    })
})




module.exports = router