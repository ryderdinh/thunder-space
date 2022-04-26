const Staff = require("../../../models/Staff");
const Project = require("../../../models/Project");
const Response = require("../../../models/Response")
module.exports = async (req, res, next) => {
  try {
    const user = await Staff.findById(req.user._id);
    const projects = (await user.populate("projects")).projects;

    // let data = [];
    // for (let i = 0; i < projects.length; i++) {
    //   const members = (await projects[i].populate("members")).members;
    //   console.log(members);
    //   data.push(await projects[i].getDetails(members));
    // }
    return res.status(200).send(new Response(200, "success", projects));
  } catch (err) {
    res.status(400).send(new Response(400, "something went wrong"));
  }
};