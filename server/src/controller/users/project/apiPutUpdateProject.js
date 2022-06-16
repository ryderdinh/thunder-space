const Project = require("../../../models/Project");
const Staff = require("../../../models/Staff");
const Response = require("../../../models/Response")
module.exports = async (req, res, next) => {
    try {
        const uid = req.user.id;
        const pid = req.params.id;
        const description = req.body.description || "";
        const name = req.body.name || "";
        const existProject = await Project.findOne({ _id: pid }).elemMatch("member", { uid: uid, role: "manager" })
        if(!existProject) return res.status(400).send(new Response(400, "project does not exist or you are not allow to edit this project"))
        description!=="" ? existProject.description = description : null;
        name !== "" ? existProject.name = name : null;
        const savedProject = await existProject.save();
        const members = (await savedProject.populate('members')).members;
        const membersToView = members.map(member => member.getProfileToCreateProject())
        return res.status(200).send(new Response(200, "success", savedProject.getProjectDetails(membersToView)))
    } catch (error) {
        return res.status(400).send(new Response(400, "something went wrong"))
    }
}
