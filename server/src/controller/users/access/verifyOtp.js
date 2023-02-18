const Staff = require('../../../models/Staff')
const bcrypt = require('bcrypt')
const Response = require('../../../models/Response')
const { comparePassword } = require('../../../utils/comparePassword')
module.exports = async (req, res, next) => {
  try {
    const { otp, email } = req.body
    const staff = await Staff.findOne({
      email: email,
      otpExpiration: { $gte: Date.now() }
    })
    if (!staff)
      return res.status(401).send(new Response(400, 'OTP is not validate'))
    if (staff) {
      const validateOtp = await bcrypt.compare(otp, staff.otp)
      if (!validateOtp)
        return res.status(401).send(new Response(400, 'OTP is not validate'))
      staff.tokens = []
      staff.otpVerified = true
      staff.save()
      return res.status(200).send(new Response(200, 'success'))
    }
  } catch (err) {
    console.log(err)
    res.status(400).send(new Response(400, 'something went wrong'))
  }
}
