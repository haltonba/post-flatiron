const fs = require("fs")
const mongoose = require("mongoose")
const colors = require("colors")
const dotenv = require("dotenv")

// Load env variables
dotenv.config({path: "./config/config.env"})

// Load models
const Task = require("./models/Task")

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})

// Read JSON files
const tasks = JSON.parse(fs.readFileSync(`${__dirname}/_data/tasks.json`, "utf-8"))

// Import into DB
const importData = async () => {
    try {
        await Task.create(tasks)
        console.log("Data imported...".green.inverse)
        process.exit()
    } catch (error) {
        console.log(error)
    }
}

// Delete data from DB
const deleteData = async () => {
    try {
        await Task.deleteMany()
        console.log("Data destroyed...".red.inverse)
        process.exit()
    } catch (error) {
        console.error(error)
    }
}

if (process.argv[2] === "-i") {
    importData()
}

else if (process.argv[2] === "-d") {
    deleteData()
}