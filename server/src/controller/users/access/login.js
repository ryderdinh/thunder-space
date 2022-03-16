const Staff = require("../../../models/Staff");
module.exports = async (req, res, next) => {
  try {
    const id = req.user._id.toString();
    const user = await Staff.findOne({ _id: id });
    if (user) {
      const profile = await user.getProfile();
      return res.status(200).send({
        status: 200,
        data: profile,
      });
    }
    return res.status(401).send({
      status: 401,
      error: "unauthorize",
    });
  
  } catch (error) {
    res.status(400).send({
      status: 400,
      error: "something went wrong",
    });
  }
};
