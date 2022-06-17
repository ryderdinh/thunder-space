const Staff = require("../../../models/Staff");
const Response = require("../../../models/Response")
module.exports = async (req, res, next) => {
  try {
    const users = await Staff.find();
    if (users.length !==0) {
      return res.status(200).send(new Response(200, "success", users.map(user => user.getProfileToCreateProject())))
    }
    return res.status(400).send(new Response(400, "user not found"));
  } catch (err) {
    res.status(400).send(new Response(400, err.message));
  }
};
