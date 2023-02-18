const Staff = require('../../../models/Staff')
const Response = require('../../../models/Response')
module.exports = async (req, res, next) => {
  try {
    const { password: newPassword, email } = req.body
    const staff = await Staff.findOne({
      email: email,
      otpVerified: true
    })
    if (!staff)
      return res.status(400).send(new Response(400, 'can not change password'))
      staff.password = newPassword
      staff.otpVerified = false
    await staff.save()
    return res.status(200).send(new Response(200, 'success'))
  } catch (err) {
    console.log(err)
    res.status(400).send(new Response(400, 'something went wrong'))
  }
}
