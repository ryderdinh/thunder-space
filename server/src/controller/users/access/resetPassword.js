const Staff = require("../../../models/Staff");
const bcrypt = require("bcrypt");
const Response = require("../../../models/Response")
const { comparePassword } = require("../../../utils/comparePassword")
module.exports = async (req, res, next) => {
  try {
    const { otp, email, password, confirmPassword } = req.body;
    console.log(Date.now());
    const staff = await Staff.findOne({
      email: email,
      otpExpiration: { $gte: Date.now() },
    });
    if(!staff) return res.status(401).send(new Response(401, "OTP is not validate"))
    if (staff) {
      const validateOtp = await bcrypt.compare(otp, staff.otp);
      if(!validateOtp) return res.status(401).send(new Response(401, 'OTP is not validate'))
      if (comparePassword(password, confirmPassword)) {
        staff.password = password;
        staff.otp = "" ;
        staff.tokens = [];
        staff.save();
        return res.status(200).send(new Response(200, "success"));
      }else{
        return res.status(400).send(new Response(400, "password not match"))
      }
      
    }
   
  } catch (err) {
    console.log(err);
    res.status(400).send(new Response(400, "something went wrong"));
  }
};
