const express = require("express")
const path = require("path")
const dotenv = require("dotenv")
const exphbs = require("express-handlebars")
const connectDB = require("./config/db")

// Load environment variables
dotenv.config({path: "./config/config.env"})

// Connect to DB
connectDB()

// Route files
const members = require("./routes/api/members")

const app = express()

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Body Parser Middleware
app.use(express.json())

// Mount Routers
app.use("/api/members", members)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))