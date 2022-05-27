const Issue = require("../../../models/Issue")
const Project = require("../../../models/Project")
const Response = require("../../../models/Response")
module.exports = async (req, res, next) => {
    try {
        const pid = req.params.pid;
        const uid = req.user.id
        // //Check exist project
        const existProject = await Project.findOne({_id: pid, deleted : false }).elemMatch("member", { uid : uid });
        if(!existProject) return res.status(400).send(new Response(400, "project is not available"))
        const issues = (await existProject.populate('issues')).issues
        const data = []
        for (const issue of issues) {
            const creator = (await issue.populate("creators")).creators
            const assign = (await issue.populate("assigns")).assigns
            const creatorToView = creator.map(creator => creator.getProfileToCreateProject())
            const assignToView = assign.map(assign => assign.getProfileToCreateProject())
           
            data.push( issue.getIssueDetails(creatorToView[0], assignToView[0]))
        }
        return res.status(200).send(new Response(200, "success", data));
    } catch (err) {
        console.log(err);
        return res.status(400).send(new Response(400, err));
    }
}
