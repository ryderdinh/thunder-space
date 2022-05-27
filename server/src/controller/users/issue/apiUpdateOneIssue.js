const Issue = require("../../../models/Issue")
const Project = require("../../../models/Project")
const Staff = require("../../../models/Staff")
const Response = require("../../../models/Response")
module.exports = async (req, res, next) => {
    try {
        const iid = req.params.iid;
        const uid = req.user.id;
        const name = req.body.name || "";
        const type = req.body.task || "";
        const assigned = req.body.assigned || "";
        const estimate = req.body.estimate || "";
        const description = req.body.description || "";
        const priority = req.body.priority || "";
        const issue  = await Issue.findOne({ _id: iid, creator: uid });
        const pid = issue.project;
    //Check  valid estimate
    if((estimate!=="") && (estimate < Date.now())) return res.status(400).send(new Response(400, "estimate value is not valid"))
    //Check exist project
    const existProject = await Project.findOne({_id: pid, deleted : false })
    //Check user assigned
    const existUserAssigned = await Staff.findOne({ email : assigned })

    const members = (await existProject.populate("members")).member;
    let userAssignedBelongtoProject 
    if(existUserAssigned){
      userAssignedBelongtoProject = members.find(member => member.uid.toString() ===  existUserAssigned.id.toString());
    }
    if((!userAssignedBelongtoProject) && (assigned!="")) return res.status(400).send(new Response(400, "user is assgined is not valid"));

        name !== "" ? issue.name = name : null
        type !== "" ? issue.type = type : null
        estimate !== "" ? issue.estimate.end = end : null
        description !== "" ? issue.description = description : null
        assigned !== "" ? issue.assign = existUserAssigned.id : null
        priority !== "" ? issue.priority = priority : null
        return res.status(200).send(new Response(200, "success", await issue.save()))
    } catch (err) {
        console.log(err);
        return res.status(400).send(new Response(400, "something went wrong"))
    }
}