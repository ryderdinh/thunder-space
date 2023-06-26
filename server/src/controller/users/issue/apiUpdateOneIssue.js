const Issue = require("../../../models/Issue")
const Project = require("../../../models/Project")
const Staff = require("../../../models/Staff")
const Response = require("../../../models/Response")
const Service = require("../../../services/index")
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
        const issue = await Issue.findOne({ _id: iid, creator: uid });
        const pid = issue.project;
        //Check  valid estimate
        if ((estimate !== "") && (estimate < Date.now())) return res.status(400).send(new Response(400, "estimate value is not valid"))
        //Check exist project
        const existProject = await Project.findOne({ _id: pid, deleted: false })
        //Check user assigned
        const existUserAssigned = await Staff.findOne({ email: assigned })

        const members = (await existProject.populate("members")).member;
        let userAssignedBelongtoProject
        if (existUserAssigned) {
            userAssignedBelongtoProject = members.find(member => member.uid.toString() === existUserAssigned.id.toString());
        }
        if ((!userAssignedBelongtoProject) && (assigned != "")) return res.status(400).send(new Response(400, "user is assgined is not valid"));

        name !== "" ? issue.name = name : null
        type !== "" ? issue.type = type : null
        estimate !== "" ? issue.estimate.end = end : null
        description !== "" ? issue.description = description : null
        assigned !== "" ? issue.assign = existUserAssigned.id : null
        priority !== "" ? issue.priority = priority : null
        await issue.save();
        await Service.history.createForIssue(iid, [[{ uid: uid }]], ['Update detail'])
        // const populateHistory = (await updatedIssue.populate("history.user.uid")).history
        //     const history = [];
        //     for (let his of populateHistory) {
        //         const usersToView = his.user.map(user => user.uid.getProfileToCreateProject())
        //         history.push({
        //             user: usersToView,
        //             time: his.time,
        //             action: his.action
        //         })
        //     }
        //     const creator = (await updatedIssue.populate("creators")).creators
        //     const assign = (await updatedIssue.populate("assigns")).assigns
        //     const creatorToView = creator.map(creator => creator.getProfileToCreateProject())
        //     const assignToView = assign.map(assign => assign.getProfileToCreateProject())
        const updatedIssue = await Service.issue.getDetailsIssueById(iid);
        return res.status(200).send(new Response(200, 'success', updatedIssue))
    } catch (err) {
        return res.status(400).send(new Response(400, err.message))
    }
}