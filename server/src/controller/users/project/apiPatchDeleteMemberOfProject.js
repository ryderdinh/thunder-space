const Staff = require("../../../models/Staff")
const Project = require("../../../models/Project")
const Response = require("../../../models/Response");
module.exports = async (req, res, next) => {
    try {
        const uid = req.user.id;
        const pid = req.params.pid;
        const mid = req.params.uid;
        const existProject = await Project.findOne({ _id: pid }).elemMatch("member",  { uid: uid, $or: [{ role: "manager"}, { role: "admin" }] });
        if(!existProject) return res.status(400).send(new Response(400, "project is not available or you are not allowed to do this action"));
        const member = await Staff.findById(mid);
        if(!member) return res.status(400).send(400, "user does not exist");
        let existMember = existProject.member.find(member => member.uid.toString() === mid.toString());
        if(!existMember) return res.status(400).send(new Response(400, "can not delete user not in project"));
        for (let i = 0; i < existProject.member.length; i++) {
            if(existProject.member[i].uid.toString() === mid.toString()){
                existProject.member.splice(i, 1)
            }
        }
        await existProject.save();
        return res.status(400).send(new Response(400, "success"))
    } catch (error) {
        return res.status(400).send(new Response(400, error.message))
    }
}