const validators = require('../../validations/index.validation')
const Response = require('../.././models/Response')
const Joi = require('joi')
module.exports = function (typeValid, validator) {
  return async function (req, res, next) {
    try {
        const validated = await validators[typeValid][validator].validateAsync(req.body)
        req.body = validated
      next()
    } catch (err) {
      if (err.isJoi) return res.status(400).send(new Response(400, err))
    }
  }
}
