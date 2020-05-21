const mongoose = require("mongoose")

const TaskSchema = new mongoose.Schema({
    description: String,
    cost: Number,
    requesterName: String,
    category: {
        type: String,
        enum: ["cleaning", "laundry", "ride", "delivery"]
    }
})

module.exports = mongoose.model("Task", TaskSchema)