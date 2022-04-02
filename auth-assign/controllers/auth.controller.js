const express = require("express");
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const { response } = require("express");

const router = express.Router();
const newToken = (user) => { 
    return jwt.sign({user}, process.env.JWT_SECRET_KEY)
   }

router.post("/register", async (req, res) => {
  try {
    //.if user exist
    let user = await User.findOne({ email:req.body.email })
    console.log(user);
    if(user) {
     return res.status(400).json("User already exist");
    }
     user = await User.create(req.body)
    let token = newToken(user)

    return res.status(200).json({"token": token});
  } catch (err) {
    return res.status(500).json({ status: "failed", message: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    //if user exist
    let user = await User.findOne({email: req.body.email})

    //2. if doesnt return 400
    if(!user) {
        return res.status(400).json("user email or password is incorrect");
    }
    //3.if exist then check password matching
    let matching = user.checkPassword(req.body.password)
    //4.if not then 400
    if(!matching) {
        return res.status(400).json("user email or password is incorrect");
    }
    //5.if matching give token
    let token = newToken(user)
    return res.status(200).json({"token": token})
    // return res.status(200).json("login user");
  } catch (err) {
    return res.status(500).json({ status: "failed", message: err.message });
  }
});


module.exports = router;
