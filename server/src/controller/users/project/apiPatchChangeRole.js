const Staff = require("../../../models/Staff")
const Project = require("../../../models/Project")
const Response = require("../../../models/Response");
module.exports = async (req, res, next) => { 
    try {
        const uid = req.user.id;
        const pid = req.params.pid;
        const mid = req.params.uid;
        const role = req.body.role;
        const existProject = await Project.findOne({ _id: pid }).elemMatch("member",  { uid: uid, role:  "manager" });
        if(!existProject) return res.status(400).send(new Response(400, "project is not available"));
        const member = await Staff.findById(mid);
        if(!member) return res.status(400).send(new Response(400, "user does not exist"));
        console.log(existProject.member);
        let existMember = existProject.member.find(member => member.uid.toString() === mid.toString());
        if(!existMember) return res.status(400).send(new Response(400, "can not change role user not in project"));
        for (let i = 0; i < existProject.member.length; i++) {
            if(existProject.member[i].uid.toString() === mid.toString()){
                existProject.member[i].role = role
            }
        }
        await existProject.save();
        return res.status(200).send(new Response(200, "success"))
    } catch (err) {
        return res.status(400).send(new Response(400, err.message))
    }
 }