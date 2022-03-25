const Staff = require("../../../models/Staff");
const Response = require("../../../models/Response")
module.exports = async (req, res, next) => {
  try {
    const id = req.user._id.toString();
    const user = await Staff.findOne({ _id: id });
    if (user) {
      const profile = await user.getProfile();
      return res.status(200).send(new Response(200, "success", profile));
    }
    return res.status(401).send(new Response(401, "unauthorize"));
  
  } catch (error) {
    res.status(400).send(new Response(400, "something went wrong"));
  }
};
