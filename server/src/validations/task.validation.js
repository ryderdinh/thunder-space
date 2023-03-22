const Joi = require('joi')
const { ObjectId } = require('mongoose').Types

const createTask = Joi.object({
  title: Joi.string().min(1).required(),
  description: Joi.string().min(1),
  status: Joi.string().valid('todo', 'doing', 'completed').required(),
  pin: Joi.bool().required()
})
const updateTask = Joi.object({
  title: Joi.string().min(1),
  description: Joi.string().min(1),
  status: Joi.string().valid('todo', 'doing', 'completed'),
  pin: Joi.bool()
})

const changeIndex = Joi.array()
  .items(
    Joi.object({
      tid: Joi.string().custom((value, helpers) => {
        if (!ObjectId.isValid(value)) {
          throw new Error('value must be objectId')
        }
        return value
      })
    })
  )
  .has(
    Joi.object({
      tid: Joi.string()
    })
  )
  .required()

const deleteTasks = Joi.array()
  .items(
    Joi.string().custom((value, helpers) => {
      if (!ObjectId.isValid(value)) {
        throw new Error('value must be objectId')
      }
      return value
    })
  )
  .has(Joi.string())
  .required()

module.exports = {
  createTask,
  updateTask,
  changeIndex,
  deleteTasks
}
