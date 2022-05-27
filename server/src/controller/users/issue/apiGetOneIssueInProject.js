const router = require("express").Router
const Response = require("../../../models/Response")
const Issue = require("../../../models/Issue")
const Project = require("../../../models/Project")
module.exports = async (req, res, next) => {
    try {
        const iid = req.params.iid
        const uid = req.user.id
        // //Check exist project
        const issue = await Issue.findOne({ _id: iid });
            if(!issue) return res.status(400).send(new Response(400, "issue does not exist"))
        const existProject = await Project.findOne({ $and: [
            { _id: issue.project },
            { deleted: false },
            { member: { $elemMatch : { uid: uid } } },
            { issue: { $elemMatch : { iid: iid } } }
        ] })
        if(!existProject) {
            return res.status(400).send(new Response(400, "project is not available"))
        }else{
            const populateHistory = (await issue.populate("history.user.uid")).history
            const history = [];
            for (let his of populateHistory) {
                const usersToView = his.user.map(user => user.uid.getProfileToCreateProject())
                history.push({
                    user: usersToView,
                    time: his.time,
                    action: his.action
                })
            }
            const creator = (await issue.populate("creators")).creators
            const assign = (await issue.populate("assigns")).assigns
            const creatorToView = creator.map(creator => creator.getProfileToCreateProject())
            const assignToView = assign.map(assign => assign.getProfileToCreateProject())
            return res.status(200).send(new Response(200, 'success',  issue.getIssueDetailsWithHistory(creatorToView[0], assignToView[0], history)))
        }
    } catch (err) {
        console.log(err);
        return res.status(400).send(new Response(400, "something went wrong"))
    }
}