const validators = require('../../validations/user.validation')
const Response = require('../.././models/Response')
const Joi = require('joi');
module.exports = function(validator) {
    return async function(req, res, next) {
        try {
            const validated = await validators[validator].validateAsync(req.body)
            req.body = validated
            next()
        } catch (err) {
            if(err.isJoi) 
                return res.status(400).send(new Response(400, err))
        }
    }
}