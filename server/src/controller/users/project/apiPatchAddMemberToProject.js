const Staff = require("../../../models/Staff")
const Project = require("../../../models/Project")
const Response = require("../../../models/Response");
const Notification = require("../../../models/Notification");
const transporter = require("../../../../config/nodeMailer/email")
const { update } = require("../../../models/Project");
module.exports = async(req, res, next) => {
     try {
        const uid = req.user.id;
        const pid = req.params.id;
        const email = req.body.email;
        const role = req.body.role;
        // if(!["manager", "normal"].includes(role)) return res.status(400).send(new Response(400, "can not set this role for member"))
        const existProject = await Project.findOne({ _id: pid }).elemMatch("member",  { uid: uid, $or: [{ role: "manager"}, { role: "admin" }] });
        if(!existProject) 
            return res.status(400).send(new Response(400, "project is not available or you are not allowed to do this action"));
        const newMember = await Staff.findOne({ email: email });
        if(!newMember) return res.status(400).send(new Response(400, "user does not exist"));

        const  foundMember = existProject.member.find(member => member.uid.toString() === newMember.id.toString())
        if(foundMember) return res.status(400).send(new Response(400, "can not add user already in project"));
        const  foundGuest = existProject.guest.find(member => member.uid.toString() === newMember.id.toString())
        if(foundGuest) return res.status(400).send(new Response(400, "you have invited this user"));
        const newDataMember = {
            uid: newMember.id,
            role: role
        }    
        existProject.guest.push(newDataMember);
        const owner = await Staff.findById(uid);
        const dataNoti = {
            content: `you have received an invitation to join project '${existProject.name}' by ${owner.name}`,
            type: "invitation-project",
            owner: newDataMember.uid,
            read: false,
            data: {
                pid: pid
            },
        }
        const io = req.app.get("socketio")
        const notification = await Notification.create(dataNoti)
        if(notification){
            io.to(newDataMember.uid).emit("invitation-project", notification)
        }
        const updatedProject = await existProject.save();
        const members = (await updatedProject.populate("members")).members;
        const membersToView = members.map(member => member.getProfileToCreateProject())
        return res.status(200).send(new Response(200, "success", updatedProject.getProjectDetails(membersToView)));
    } catch (error) {
        console.log(error);
         res.status(400).status(400).send(new Response(400, error.message));
     }
 }