const Project = require("../../../models/Project")
const Staff = require("../../../models/Staff")
const Issue = require("../../../models/Issue")
const Response = require("../../../models/Response")
module.exports = async (req, res, next) => {
  try{
      //params
    const uid = req.user.id
    const pid = req.params.pid
    //body
    const name = req.body.name
    const type = req.body.type
    const assigned = req.body.assigned
    const [ start, end] = req.body.estimate;
    const priority = req.body.priority
    const description = req.body.description || ""
    //Check exist project
    const existProject = await Project.findOne({ id : pid, deleted : false }).elemMatch("member", { uid : uid });
    if(!existProject) return res.status(400).send(new Response(400, "project is not available"))

    //Check user assigned
    const existUserAssigned = await Staff.findOne({ email : assigned })
    if(!existUserAssigned) return res.status(400).send(new Response(400,'user assigned does not exist'))
    const members = (await existProject.populate("members")).member;
    const UserAssignedBelongtoProject = members.find(member => member.uid.toString() ===  existUserAssigned.id.toString());
    if(!UserAssignedBelongtoProject) return res.status(400).send(new Response(400, "user is assgined is not valid"));

    const creator = { id : uid };
    const assign = { id : existUserAssigned.id }
    const newIssue = await Issue.create({
        name: name,
        code: `${existProject.code}-${existProject.issue.length + 1}`,
        type: type,
        creator: creator,
        assign: assign,
        estimate: {
            start: start,
            end: end
        },
        description: description,
        priority: priority
    })
    //Save to project
    existProject.issue.push({ iid: newIssue.id })
    await existProject.save()
    // if(existProject && existUser){
    //     let creator = existProject.member.find(e => e.uid === uid ) 
    //     let assigned = existProject.member.find(e => e.uid === existUser.id) 
    //     console.log(assigned);
    //     let code = `${existProject.code}-${existProject.issue.length + 1}`
    //     // console.log(icode);
    //     let assignedPerson
    //     let creatorInfo = {
    //         uid : creator.uid,
    //         name : creator.name,
    //     }
    //     if(assigned){
    //         assignedPerson = {
    //             uid : assigned.uid,
    //             name : assigned.name,
    //         }
    //     }else{
    //         res.json({ data : {
    //             status : "the person you assign is not in your project ! "
    //         } })
    //     }
    //     // console.log(creatorInfo);
    //     let result = {
    //         iid : existProject.pid,
    //         issueName : name,
    //         issueCode : icode,
    //         issueType : type,
    //         issueCreator : creatorInfo,
    //         issueAssign : assignedPerson,
    //         issueDescription : description,
    //         issuePriority : priority
    //     }
    //     const newIssue = new Issue(result)
    //     let err = newIssue.validateSync()
    //     if(!err){
    //         // console.log(err);
    //         newIssue.save()
    //         const update = await Project.findOneAndUpdate({pid : pid},{ 
    //             $push : { issue : {
    //                 iid : result.iid,
    //                 issueName : result.issueName,
    //                 issueCode : result.issueCode,
    //                 issueType : result.issueType
    //             } }
    //         }, { runValidators: true })
    //     }else{
    //         return res.json({ status : "cannot assign !" })
    //     }
    //     return res.json({
    //             status : `assign to ${assign} complete !`
    //     })
    // }else{
    //     return res.json([])
    // }
    return res.status(200).send(new Response(200, "success", newIssue))
  }catch(err){
      console.log(err);
    return res.status(400).send(new Response(400, err.message));
  }

}
