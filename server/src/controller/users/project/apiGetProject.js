const Staff = require("../../../models/Staff");
const Project = require("../../../models/Project");
const Response = require("../../../models/Response")
module.exports = async (req, res, next) => {
  try {
    const user = await Staff.findById(req.user._id);
    const projects = (await user.populate("projects")).projects;
    const filterDeleted = projects.filter(e =>  e.deleted === false)
    let data = []
    for (const project of filterDeleted) {
      const members = (await project.populate("members")).members
      const publicMembersData = members.map(member => member.getProfileToCreateProject())
      data.push(project.getProjectDetails(publicMembersData));  
    }
    return res.status(200).send(new Response(200, "success", data ));
  } catch (err) {
    res.status(400).send(new Response(400, "something went wrong"));
  }
};