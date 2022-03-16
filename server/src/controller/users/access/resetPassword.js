const Staff = require("../../../models/Staff");
module.exports = async (req, res, next) => {
  try {
    const { password, confirmPassword } = req.body;
    const resetToken = req.params.resetToken;
    const staff = await Staff.findOne({
      resetToken: resetToken,
      resetTokenExpiration: { $gte: Date.now() },
    });
    console.log(staff);
    if (staff) {
      if (password === confirmPassword && password.length >= 6) {
        staff.password = password;
        staff.resetToken = process.env.DEFAULT_RESET_TOKEN;
        staff.resetTokenExpiration = 0;
        staff.save();
        return res.status(200).send({ data: "success" });
      }
    }
    return res.status(401).send({
      status: 401,
      error: "unauthorized",
    });
  } catch (err) {
    res.status(400).send({
      status: 400,
      error: "something went wrong",
    });
  }
};
