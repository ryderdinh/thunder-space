const Staff = require("../../../models/Staff")
const Project = require("../../../models/Project")
const Response = require("../../../models/Response");
const mongoose = require("mongoose");
const { update } = require("../../../models/Project");
module.exports = async(req, res, next) => {
     try {
        const uid = req.user.id;
        const pid = req.params.id;
        const emails = req.body.members;
        const existProject = await Project.findOne({ _id: pid }).elemMatch("member",  { uid: uid, $or: [{ role: "manager"}, { role: "admin" }] });
        const removeDuplicateEmails = [...new Set(emails)]
        if(removeDuplicateEmails.length !== emails.length) return res.send(new Response(400, "Your emails are duplicate"))
        if(!existProject) 
            return res.status(400).send(new Response(400, "project is not available or you are not allowed to do this action"));
        const newMembers = await Staff.find({ email: emails });
        const newDataMembers = newMembers.map(member => member = {
                uid: member._id,
                role: "normal"
        })
        let foundMember = null
        for (let i = 0; i < newDataMembers.length; i++) {
            foundMember = existProject.member.find(member => member.uid.toString() === newDataMembers[i].uid.toString())
           if(foundMember) { i = newDataMembers.length }
        }
        if(foundMember) return res.status(400).send(new Response(400, "can not add user already in project"));
        for (const m of newDataMembers) {
            existProject.member.push(m);
        }
        const updatedProject = await existProject.save();
        const members = (await updatedProject.populate("members")).members;
        const membersToView = members.map(member => member.getProfileToCreateProject())
        return res.status(200).send(new Response(200, "success", updatedProject.getProjectDetails(membersToView)));
    } catch (error) {
         res.status(400).status(400).send(new Response(400, error.message));
     }
 }