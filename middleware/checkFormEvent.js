const Joi = require("joi")
const moment = require("moment")
// validate register
 const authSchema = Joi.object({
        eid : Joi.string(),
        name : Joi.string().min(2).required(), 
        date : Joi.date().min("now"),
        event_detail : {
            hours : Joi.string(),
            position : Joi.string(),
            content :Joi.string()
        }
    })
    

module.exports = { authSchema }