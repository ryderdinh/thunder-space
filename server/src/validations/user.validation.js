const Joi = require('joi');

const updateIssue = Joi.object({
    name: Joi.string().min(2),
    type: Joi.string().min(1).valid('task', 'bug'),
    assigned: Joi.string().email(),
    estimate: Joi.number(),
    description: Joi.string().min(1),
    priority: Joi.string().valid('low', 'medium', 'high', 'highest'),
})

module.exports = {
    updateIssue
}