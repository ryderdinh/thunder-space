const Staff = require("../../../models/Staff")
const Project = require("../../../models/Project")
const Response = require("../../../models/Response");
const mongoose = require("mongoose")
 module.exports = async(req, res, next) => {
     try {
        const uid = req.user.id;
        const pid = req.params.id;
        const newNormalMembersEmail = req.body.members;
        const newManagersEmail = req.body.managers
        const existProject = await Project.findOne({ id: pid }).elemMatch("member",  { uid: uid, role:  "manager" });
        
        if(!existProject) 
            return res.status(400).send(new Response(400, "project is not available"));

        const newMembersEmail = [
            ...req.body.managers,
            ...req.body.members,
          ];
        const removeDuplicate = [...new Set(newMembersEmail)];
      
        if (removeDuplicate.length != newMembersEmail.length)
            return res.status(400).send(new Response(400, "wrong data form"));
        
        const newNormalMembers = await Staff.find({ email: newNormalMembersEmail })
        const newManagers = await Staff.find({ email: newManagersEmail })
        const newMembers = [...newNormalMembers, ...newManagers]

        const oldMembers = (await existProject.populate("members")).member;
        let newMembersValid = true
        // newMembers.forEach(newMember => {
        //     if(oldMembers.find(oldMember => oldMember.uid.toString() === newMember.id.toString())){
        //         newMembersValid = false
        //         return res.status(400).send(new Response(400, "new members are not valid"))
        //     }
        // })
        for(let i=0; i< newMembers.length; i++){
            if(oldMembers.find(oldMember => oldMember.uid.toString() === newMembers[i].id.toString())){
                 newMembersValid = false;
                 i= newMembers.length
                 return res.status(400).send(new Response(400, "new members are not valid"))
            }
        }
       if(newMembersValid){
            const mapNewNormalMembers = newNormalMembers.map(newNormalMember =>  (newNormalMember = {
            uid: newNormalMember.id,
            role: "normal",
            name: newNormalMember.name,
            avatar: newNormalMember.avatar.url
        }))
        const mapNewMangers = newManagers.map(newManager =>  (newManager = {
            uid: newManager.id,
            role: "manager",
            name: newManager.name,
            avatar: newManager.avatar.url
        }))
        const result = [...mapNewMangers, ...mapNewNormalMembers];
        // existProject.member.push(result);
        result.forEach(e => {
            existProject.member.push(e)
        })
        return res.status(200).send(new Response(200, "success", (await existProject.save()).getProjectDetails()));
       }
    } catch (error) {
        console.log(error);
         res.status(400).status(400).send(new Response(400, "something went wrong"));
     }
 }