const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config()
const express = require("express");
const app = express()
app.use(express.json());
app.use(cors())

const bookController = require("./controllers/book.controller")
const authController = require("./controllers/auth.controller")

let port = process.env.PORT || 8003
mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log("Connected to mongo db"))
.catch(()=> console.log("Not connected to mongo db"))


app.use("/books", bookController)
app.use("/auth", authController );

app.listen(port, async() => {
    console.log("server is running ", port);
})