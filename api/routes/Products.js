const router = require("express").Router();

const { ObjectId } = require("mongodb");
const { getDb } = require("../db");
const { verify } = require("jsonwebtoken");
const {
  verifyToken,
  verifyTokenAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

// CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const db = getDb();
  db.collection("products")
    .insertOne(req.body)
    .then((doc) => {
      if (!doc) {
        res.status(403).send("Document could not be added");
      }
      res.status(201).send(doc);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Edit product
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  const db = getDb();

  try {
    const updatedproduct = await db
      .collection("products")
      .findOneAndUpdate(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body },
        { returnDocument: "after" }
      );

    if (!updatedproduct) {
      res.status(404).send("Product not found");
    }
    res.status(200).send(updatedproduct);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error" });
  }
});

// Delete
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  const db = getDb();
  const data = await db
    .collection("products")
    .findOne({ _id: new ObjectId(req.params.id) });
  if (!data) {
    res.status(403).send("Product cannot be found.");
  }
  db.collection("products")
    .deleteOne({ _id: new ObjectId(req.params.id) })
    .then((result) => {
      res.status(200).send({
        result,
        message: "Product has been deleted 🎱",
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
});

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const db = getDb();
  const qNew = req.query.new;
  const qCategory = req.query.category;

  try {
    let products;

    if (qNew) {
      products = await db
        .collection("products")
        .find()
        .sort({ createdAt: -1 })
        .limit(8)
        .toArray();
    } else if (qCategory) {
      products = await db
        .collection("products")
        .find({ category: qCategory })
        .sort({ createdAt: -1 })
        .limit(8)
        .toArray();
    } else {
      products = await db
        .collection("products")
        .find()
        .sort({ createdAt: -1 })
        .limit(8)
        .toArray();
    }

    res.status(200).send(products);
  } catch (err) {
    res.status(500).json({
      Error: "Could not fetch the products.",
      message: err,
    });
  }
});

// GET PRODUCT
router.get("/find/:id", (req, res) => {
  const db = getDb();

  db.collection("products")
    .findOne({ _id: new ObjectId(req.params.id) })
    .then((product) => {
      res.status(200).send({ product });
    })
    .catch(() => {
      res.status(500).send("Could not find product.");
    });
});

module.exports = router;
