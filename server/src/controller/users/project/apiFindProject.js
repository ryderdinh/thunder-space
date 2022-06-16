const router = require("express").Router();
const ObjectId = require('mongoose').Types.ObjectId
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
    const issuesToView = []
    for (const issue of issues) {
      let creator = null;
      let assign = null; 
      ObjectId.isValid(issue.creator) ? creator = (((await issue.populate("creators")).creators)[0]).getProfileToCreateProject() : null;
      ObjectId.isValid(issue.assign) ? assign = (((await issue.populate("assigns")).creators)[0]).getProfileToCreateProject() : null;
      issuesToView.push(issue.getIssueDetails(creator, assign));
    }
    if(checkUserInProject){
      const members = (await project.populate("members")).members;
      const membersToView = members.map(member => member.getProfileToCreateProject());
      for (let i = 0; i < project.member.length; i++) {
          membersToView[i].role = project.member[i].role;
      }
      return res.status(200).send(new Response(200, "success",await project.getProjectDetailsWithIssues(membersToView, issuesToView)))
    }
    return res.status(400).send(new Response(400, "you are not in this project"))
  } catch (err) {
    console.log(err);
    res.status(400).send(new Response(400, "something went wrong"));
  }
};

