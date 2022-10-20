const Staff = require("../../../models/Staff");
const Response = require("../../../models/Response");
module.exports = async (req, res, next) => {
  try {
    const uid = req.user.id;
    const user = await Staff.findById(uid);
    if(!user) return res.status(400).send(new Response(400, "user not found"))
    return res.status(200).send(new Response(200, "success", user.getProfile()))
  } catch (error) {
    return res.status(400).send(new Response(400, error.message))
  }
};
