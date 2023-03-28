const mongoose = require('mongoose')
const Schema = mongoose.Schema

const History = new Schema(
  {
    users: [
      {
        uid: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Staff'
        }
      }
    ],
    action: { type: String, required: true },
    type: { type: String, required: true },
    iid: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'Issue'
    },
    pid: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'Project'
    }
  },
  {
    timestamps: true
  }
)
module.exports = mongoose.model('History', History)
