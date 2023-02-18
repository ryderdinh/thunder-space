const Joi = require('joi')

const createProject = Joi.object({
    name: Joi.string().min(2).max(25).required(),
    description: Joi.string(),
    managers: Joi.array().required().items(Joi.string().email()),
    members: Joi.array().required().items(Joi.string().email())
})

const addMemberToProject = Joi.object({
    email: Joi.string().email().required(),
    role: Joi.string().valid('manager', 'normal').required()
})

const changeRole = Joi.object({
    role: Joi.string().valid('manager', 'normal').required()
})
module.exports = {
    createProject,
    addMemberToProject,
    changeRole
}