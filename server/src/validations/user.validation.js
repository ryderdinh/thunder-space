const Joi = require('joi')

const location = Joi.object({
  lat: Joi.number().min(-90).max(90).required().label('location is not valid'),
  lon: Joi.number().min(-180).max(180).required().label('location is not valid')
})
const changePassword = Joi.object({
  newPassword: Joi.string().min(6).empty(' ').required(),
  currentPassword: Joi.string().min(6).empty(' ').required()
})

const forgetPassword = Joi.object({
  email: Joi.string().email().required()
})
const resetPassword = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
})
const verifyOtp = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.string(),
})
module.exports = {
  location,
  changePassword,
  forgetPassword,
  resetPassword,
  verifyOtp
}
