const { Schema, model } = require('mongoose')

const TaskSchema = new Schema(
  {
    title: {
      type: String
    },
    description: {
      type: String
    },
    status: {
      type: String,
      enum: ['todo', 'doing', 'completed']
    },
    pin: {
      type: Boolean
    }
  },
  {
    timestamps: true
  }
)

module.exports = model('task', TaskSchema)
