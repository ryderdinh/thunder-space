const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Notification = new Schema({
    content: { type: String, required: true },
    type: { type: String, enum: ["invitation-project"], required: true },
    time: { type: Number, required: true },
    read: { type: Boolean, required: true, enum:[true, false] },
    data: {
        pid: { type: mongoose.Schema.Types.ObjectId, required: false, ref: "Project" },     
    },
    owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Staff " }
})

module.exports = mongoose.model("Notification", Notification)