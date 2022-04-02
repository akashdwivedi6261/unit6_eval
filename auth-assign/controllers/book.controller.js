const express = require("express");
const authCheck = require("../middlewares/auth.middleware")
const Books = require("../models/book.model");

const router = express.Router();

router.post("/post", authCheck,async (req, res) => {
  console.log("akash :",req.body);
  try {
    const Book = await Books.create({...req.body, user_id: req.user._id});
    return res.send(Book);
  } catch (err) {
    console.log("pro ", Book);

    return res.status(500).send({ message: err.message });
  }
});

router.get("/get", async (req, res) => {
  try {
    const Book = await Books.find();

    return res.send(Book);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.delete("/delete", authCheck, async (req, res) => {
  try {
    const Book = await Books.findByIdAndDelete({user_id: req.user._id});

    return res.send(Book);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;
