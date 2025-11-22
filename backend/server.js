require('dotenv').config();
const express = require("express");
const app = express();

const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./rotues/auth");
const postRoutes = require("./rotues/posts");

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Povezan sa bazom."))
.catch(() => console.log("Nije povezan sa bazom."));

app.use(express.json());
app.use(cors('*'));

app.get("/", (req, res) => {
    res.send("Pocenta stranica.")
})

app.use("/auth", authRoutes);
app.use("/posts", postRoutes);

app.listen(3000);