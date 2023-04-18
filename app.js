const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
// const rateLimit = require("./middleware/rate-limiter")
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"))

  
const app = express()
app.use(express.json());

const booksRoutes = require("./routes/routes-books")
const userRoutes = require("./routes/routes-user")

const cors = require("cors")
app.use(cors())


// app.use(rateLimit)

app.use("/api/books", booksRoutes)
app.use("/api/auth", userRoutes)
app.use("/images", express.static(path.join(__dirname, "images")))

module.exports = app