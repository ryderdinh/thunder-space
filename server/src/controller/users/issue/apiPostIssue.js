const Project = require("../../../models/Project")
const Staff = require("../../../models/Staff")
const Issue = require("../../../models/Issue")
const Response = require("../../../models/Response")
const { date, exist } = require("joi")
module.exports = async (req, res, next) => {
  try{
      //params
    const uid = req.user.id
    const pid = req.params.pid
    //body
    const name = req.body.name
    const type = req.body.type
    const assigned = req.body.assigned
    const end = req.body.estimate;
    const priority = req.body.priority
    const description = req.body.description || ""
    //Check  valid estimate
    if(end < Date.now()) return res.status(400).send(new Response(400, "estimate value is not valid"))
    //Check exist project
    const existProject = await Project.findOne({ id : pid, deleted : false }).elemMatch("member", { uid : uid });
    if(!existProject) return res.status(400).send(new Response(400, "project is not available"))
    //Check user assigned
    const existUserAssigned = await Staff.findOne({ email : assigned })

    const members = (await existProject.populate("members")).member;
    let userAssignedBelongtoProject 
    if(existUserAssigned){
      userAssignedBelongtoProject = members.find(member => member.uid.toString() ===  existUserAssigned.id.toString());
    }
    if((!userAssignedBelongtoProject) && (assigned!="")) return res.status(400).send(new Response(400, "user is assgined is not valid"));

    const existCreator = await Staff.findById(uid);
    const creator = { id : existCreator, name: existCreator.name, email: existCreator.email, avatar: existCreator.avatar.url };
    const assign = assigned === "" ? null : { id : existUserAssigned.id, name: existUserAssigned.name, email: existUserAssigned.email, avatar: existUserAssigned.avatar.url }
    const newIssue = await Issue.create({
        name: name,
        code: `${existProject.code}-${existProject.issue.length + 1}`,
        type: type,
        creator: creator,
        assign: assign,
        estimate: {
            start: Date.now(),
            end: end
        },
        description: description,
        priority: priority
    })
    //Save to project
    existProject.issue.push({ iid: newIssue.id });
    await existProject.save();
    return res.status(200).send(new Response(200, "success", newIssue))
  }catch(err){
    console.log(err);
    return res.status(400).send(new Response(400, err.message));
  }

}
