const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Notification = new Schema({
    content: { type: String, required: true },
    type: { type: String, enum: ["invitation"], required: true },
    status: { type: String, required: true, enum: ["reject", "pending", "accept"] },
    createdAt: { type: Number, required: true, default: Date.now() },
    pid: { type: mongoose.Schema.Types.ObjectId, required: false, ref: "Project" },
    owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Staff " }
})

module.exports = mongoose.model("Notification", Notification)