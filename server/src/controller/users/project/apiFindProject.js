const router = require("express").Router();
const Project = require("../../../models/Project");
const Staff = require("../../../models/Staff")
const Response = require("../../../models/Response")
module.exports = async (req, res, next) => {
  try {
    const uid = req.user.id;
    const pid = req.params.id;
    const project = await Project.findById(pid)
    if(!project || project.deleted == true){
      return res.status(400).send(new Response(400, "project are not available"))
    }
    const members = (await project.populate("members")).member
    let checkUserInProject = false
    members.forEach(member => {
      if(member.uid.toString() === uid){
        checkUserInProject = true
      }
    });
    const issues = (await project.populate("issues")).issues
    if(checkUserInProject){
      return res.status(200).send(new Response(200, "success",await project.getProjectDetails(issues)))
    }
    return res.status(400).send(new Response(400, "you are not in this project"))
  } catch (err) {
    console.log(err);
    res.status(400).send(new Response(400, "something went wrong"));
  }
};

