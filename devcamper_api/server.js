const express = require("express")
const dotenv = require("dotenv")
const morgan = require("morgan")
const colors = require("colors")
const connectDB = require("./config/db")
const errorHandler = require("./middleware/error")

// Load environment variables
dotenv.config({path: "./config/config.env"})

// Connect to DB
connectDB()

// Route files
const bootcamps = require("./routes/bootcamps")

const app = express()

// Body Parser
app.use(express.json())

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"))
}

// Mount routers
app.use("/api/v1/bootcamps", bootcamps)

// Error Handling Middleware
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`.blue))