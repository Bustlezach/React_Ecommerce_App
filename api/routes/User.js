const router = require("express").Router();
const { ObjectId } = require("mongodb");
const { getDb } = require("../db");
const { verify } = require("jsonwebtoken");
const {
  verifyToken,
  verifyTokenAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

// GET USER STATS
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const db = getDb();
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  // res.status(200).send("Display stats here")
  try {
    const data = await db
      .collection("users")
      .aggregate([
        { $match: { createAt: { $gte: lastYear } } },
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ])
      .toArray();
    const countUsers = await db.collection("users").find().count();
    res.status(200).send({ ...data, countUsers });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err });
  }
});

// Edit user
router.put("/:id", verifyTokenAuthorization, async (req, res) => {
  const db = getDb();

  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }

  try {
    const updateduser = await db
      .collection("users")
      .findOneAndUpdate(
        { _id: new ObjectId(req.params.id) },
        { $set: { ...req.body, updatedAt: new Date() } },
        { returnDocument: "after" }
      );

    if (updateduser) {
      res.status(200).send(updateduser);
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error" });
  }
});

// Delete
router.delete("/:id", verifyTokenAuthorization, (req, res) => {
  const db = getDb();
  db.collection("users")
    .deleteOne({ _id: new ObjectId(req.params.id) })
    .then((result) => {
      res.status(200).send({
        result,
        message: "User has been deleted 🎱",
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
});

// GET ALLUSER
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const db = getDb();

  // const page = parseInt(req.query.page) || 0;
  // const userPerPage = 10;

  const query = req.query.new;

  try {
    // LIMIT
    const users = query
      ? await db
          .collection("users")
          .find()
          .sort({ username: 1 })
          .limit(5)
          .toArray()
      : await db.collection("users").find().sort({ username: 1 }).toArray();

    // PAGINATION
    // const users = await db.collection("users")
    //     .find()
    //     .sort({username: 1})
    //     .skip(page * userPerPage)
    //     .limit(userPerPage)
    //     .toArray()

    if (!users) {
      res.status(403).send("No user");
    }
    res.status(200).send(users);
  } catch (err) {
    res.status(500).json({
      Error: "Could not fetch the documents.",
      message: err,
    });
  }
});

// GET USER
router.get("/:id", verifyTokenAndAdmin, (req, res) => {
  const db = getDb();
  if (!ObjectId.isValid(req.params.id)) {
    response.status(404).json({
      Error: "The Id you've provided is not valid.",
    });
  }

  db.collection("users")
    .findOne({ _id: new ObjectId(req.params.id) })
    .then((user) => {
      const { password, ...others } = user;
      res.status(200).send({ ...others });
    })
    .catch(() => {
      res.status(500).send("Could not find user.");
    });
});

module.exports = router;
