const router = require("express").Router();


const { ObjectId } = require("mongodb");
const {getDb} = require("../db");
const { verify } = require("jsonwebtoken");
const {verifyToken, verifyTokenAuthorization, verifyTokenAndAdmin} = require("./verifyToken");



// GET MONTHLY INCOME
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const db = getDb();
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = db.collection("order").aggregate([
      {$match: { createdAt: { $gte: previousMonth } }},
      {
        $project: {
          month: { $month: "$createdAt"},
          sales: "$amount"
        },
      },
      {
        $group: {
          _id: "$month",
          total: {$sum: "$sales"}
        }
      }
    ]);
    res.status(200).send(income);
  }
  catch(err) {
    res.status(500).send(err);
  }
})


// CREATE 
router.post("/", verifyToken, async (req, res) => {
  const db = getDb();
  const timeStamp = () => new Date();
  const data = req.body;

  try {
    const order = await db.collection("order").insertOne({
      ...data,
      status: "pending", 
      createdAt: timeStamp(), 
      updatedAt: timeStamp()
    });
    if (!order) {
      res.status(403).send("Document could not be added")
    }
    res.status(201).json({order});
  }
  catch(err) {
    console.log(err);
    res.status(500).send(err)
  }
})



// Edit order
router.put("/:orderId", verifyTokenAndAdmin, async (req, res) => {
  const db = getDb();
 
 try{
  const updatedOrder = await db.collection("order")
  .findOneAndUpdate(
    {_id: new ObjectId(req.params.orderId)},
    {$set: { ...req.body, updatedAt: new Date() }},
    { returnDocument: 'after' }
  );

  if (!updatedOrder) {
    res.status(404).send("order not found")
  } 
  res.status(200).send(updatedOrder);

 }
 catch(err) {
  console.error(err);
  res.status(500).send({message: "Internal server error"})
 }
});


// Delete
router.delete("/:OrderId", verifyTokenAndAdmin, async (req, res) => {
  const db = getDb();
  const data = await db.collection("order").findOne({_id: new ObjectId(req.params.OrderId)});
  if(!data) {
    res.status(403).send("Order cannot be found.")
  }
  db.collection("order")
    .deleteOne({_id: new ObjectId(req.params.OrderId)})
    .then(result => {
      res.status(200).send({
        result,
        message: "Order has been deleted 🎱"
      });
    })
    .catch(err => {
      res.status(500).send({message: err});
    })
})


// GET USER ORDERs
router.get("/:userId", verifyTokenAuthorization, (req, res) => {
  const db = getDb();

  db.collection("order")
    .find({userId: new ObjectId(req.params.userId)})
    .toArray()
    .then((orders) => {
      res.status(200).send(orders)
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("An error occurred while fetching the orders.");
    })
})

// GET ALL ORDER
router.get("/", verifyTokenAndAdmin, (req, res) => {
  const db = getDb();

  db.collection("order")
    .find()
    .limit(5)
    .toArray()
    .then((orders) => {
      // console.table(orders);
      res.status(200).send(orders)
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("An error occurred while fetching the orders.");
    })
})





module.exports = router