const express = require("express")
const dotenv = require("dotenv")
const colors = require("colors")
const connectDB = require("./config/db")

// Load environment variables
dotenv.config({path: "./config/config.env"})

// Connect to DB
connectDB()

// Route file
const tasks = require("./routes/tasks")

const app = express()

// Allow CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Body parser
app.use(express.json())

// Mount routers
app.use("/tasks", tasks)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`.blue);
});