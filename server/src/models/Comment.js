const { Schema, model } = require('mongoose')

const CommentSchema = new Schema(
  {
    onwer: { type: Schema.Types.ObjectId, required: true },
    iid: { type: Schema.Types.ObjectId, required: true },
    content: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

module.exports = model('Comment', CommentSchema)
