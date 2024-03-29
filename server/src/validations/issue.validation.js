const Joi = require('joi')
const updateIssue = Joi.object({
  name: Joi.string().min(2),
  type: Joi.string().min(1).valid('task', 'bug'),
  assigned: Joi.string().email(),
  estimate: Joi.number(),
  description: Joi.string().min(1),
  priority: Joi.string().valid('low', 'medium', 'high', 'highest')
})

const createIssue = Joi.object({
  name: Joi.string()
    .min(2)
    .max(60)
    .required()
    .label("Issue's name is not valid"),
  type: Joi.string()
    .valid('task', 'bug')
    .required(true)
    .label("Issue's type is not supported"),
  assigned: Joi.string().email(),
  estimate: Joi.date()
    .timestamp()
    .min(Date.now())
    .label('Estimate value is not valid'),
  priority: Joi.string().valid('low', 'medium', 'high', 'highest'),
  description: Joi.string()
})

const changeStatus = Joi.object({
  status: Joi.string()
    .valid('started', 'reject', 'done', 'pending', 'close')
    .required(true)
    .label('staus is not valid')
})

module.exports = {
  updateIssue,
  createIssue,
  changeStatus
}
