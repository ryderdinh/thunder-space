const Staff = require("../../../models/Staff");

module.exports = async (req, res, next) => {
  try {
    const email = req.query.email;
    const user = await Staff.findOne({ email: email });
    if (user) {
      return res.status(200).send({
        status: 200,
        data: user.getProfile(),
      });
    }
    return res.status(404).send({
      status: 404,
      error: "user not found",
    });
  } catch (err) {
    res.status(400).send({
      status: 400,
      error: "something went wrong",
    });
  }
};
