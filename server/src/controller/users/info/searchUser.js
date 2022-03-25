const Staff = require("../../../models/Staff");
const Response = require("../../../models/Response")
module.exports = async (req, res, next) => {
  try {
    const email = req.query.email;
    const user = await Staff.findOne({ email: email });
    if (user) {
      return res.status(200).send(new Response(200, "success", user.getProfile()))
    }
    return res.status(404).send(new Response(404, "user not found"));
  } catch (err) {
    res.status(400).send(new Response(400, "something went wrong"));
  }
};
