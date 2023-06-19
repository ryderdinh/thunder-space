const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Notification = new Schema(
  {
    type: { type: String, required: true },
    content: { type: String, required: true },
    read: {
      type: Boolean,
      required: true,
      enum: [true, false],
      default: false
    },
    data: {
      pid: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Project'
      },
      iid: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Issue'
      }
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Staff'
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Notification', Notification)
