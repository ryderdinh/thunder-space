const Joi = require("joi").extend(require('@joi/date'));

// validate register
 const authSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        name : Joi.string().min(2).required(), 
        birthday: Joi.string(),
        position : Joi.string().min(2),
        department : Joi.string().min(2),
        phonenumber : Joi.string().length(10)      
    })

module.exports = { authSchema }