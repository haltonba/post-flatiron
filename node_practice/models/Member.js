const mongoose = require("mongoose")

const MemberSchema = new mongoose.Schema({
    name: String,
    email: String,
    status: String
})

module.exports = mongoose.model("Member", MemberSchema)