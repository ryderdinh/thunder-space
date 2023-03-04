const { object } = require('joi')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const History = require('./History')
const Issue = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [2, 'name length must be more than 2 characters'],
      maxlength: [60, 'name length must be less than 60 characters']
    },
    code: { type: String, required: true, unique: true },
    type: {
      type: String,
      required: true,
      enum: {
        values: ['task', 'bug'],
        message: '{VALUE}  is not supported'
      }
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Staff',
      required: true
    },
    assign: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
    estimate: {
      start: { type: Number },
      end: { type: Number }
    },
    description: String,
    priority: {
      type: String,
      enum: {
        values: ['low', 'medium', 'high', 'highest'],
        message: '{VALUE}  is not supported'
      },
      required: true
    },
    attachment: [],
    status: {
      type: String,
      enum: {
        values: ['pending', 'started', 'reject', 'done', 'close'],
        message: '{VALUE} is not supported'
      }
    },
  },
  {
    timestamps: true
  }
)

Issue.virtual('creators', {
  ref: 'Staff',
  localField: 'creator',
  foreignField: '_id'
})

Issue.virtual('assigns', {
  ref: 'Staff',
  localField: 'assign',
  foreignField: '_id'
})

Issue.methods.getIssueDetails = function (creator, assign) {
  const objectIssue = this.toObject()
  objectIssue.creator = creator
  objectIssue.assign = assign
  return objectIssue
}

Issue.methods.getIssueDetailsWithHistory = function (creator, assign, history) {
  const objectIssue = this.toObject()
  objectIssue.history = history
  objectIssue.creator = creator
  objectIssue.assign = assign
  return objectIssue
}
Issue.virtual('actionUsers', {
  ref: 'Staff',
  localField: 'history.user.uid',
  foreignField: '_id'
})

// Issue.post('findOneAndUpdate', async function (result) {
//   console.log(JSON.stringify(result));
//   if (this.isModified('status')) {
//     await History.create({
//       user: [{ uid: this.uid }],
//       action: `Change status issue to ${this.status}`,
//       type: 'issue',
//       iid: this._id
//     })
//     delete this.uid
//     next()
//   }
// })

module.exports = mongoose.model('Issue', Issue)
