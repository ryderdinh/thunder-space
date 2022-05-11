const Project = require("../../../models/Project")
const Response = require("../../../models/Response")
module.exports = async (req, res, next) => {
    try {
        const pid = req.params.id;
        const uid = req.user.id;
        const project = await Project.findById(pid);
        const members = (await project.populate("members")).member
        const check = members.find(member => (member.uid.toString() == uid && member.role === "manager"));
        if(check){
            project.deleted = true;
            await project.save()
            return res.status(200).send(new Response(200, "success"))
        }
        return res.status(400).send(new Response(400, "you are not allow to delete this project"))
    } catch (err) {
        return res.status(400).send(new Response(400, err.message ))
    }
}