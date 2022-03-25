const router = require("express").Router()
const Project = require("../../../models/Project")
const Staff = require("../../../models/Staff")
const Issue = require("../../../models/Issue")


module.exports = async (req, res, next) => {
  try{
      //params
    const uid = req.user.id
    const pid = req.params.pid
    //body
    const name = req.body.name
    const type = req.body.type
    const assign = req.body.assign
    const priority = req.body.priority
    const description = req.body.description
    const existProject = await Project.findOne({ pid : pid , member  : { $elemMatch : { uid : uid } } })
    const existUserAssign = await Staff.findOne({ email : assign })
    if(existProject && existUser){
        let creator = existProject.member.find(e => e.uid === uid ) 
        let assigned = existProject.member.find(e => e.uid === existUser.id) 
        console.log(assigned);
        let code = `${existProject.code}-${existProject.issue.length + 1}`
        // console.log(icode);
        let assignedPerson
        let creatorInfo = {
            uid : creator.uid,
            name : creator.name,
        }
        if(assigned){
            assignedPerson = {
                uid : assigned.uid,
                name : assigned.name,
            }
        }else{
            res.json({ data : {
                status : "the person you assign is not in your project ! "
            } })
        }
        // console.log(creatorInfo);
        let result = {
            iid : existProject.pid,
            issueName : name,
            issueCode : icode,
            issueType : type,
            issueCreator : creatorInfo,
            issueAssign : assignedPerson,
            issueDescription : description,
            issuePriority : priority
        }
        const newIssue = new Issue(result)
        let err = newIssue.validateSync()
        if(!err){
            // console.log(err);
            newIssue.save()
            const update = await Project.findOneAndUpdate({pid : pid},{ 
                $push : { issue : {
                    iid : result.iid,
                    issueName : result.issueName,
                    issueCode : result.issueCode,
                    issueType : result.issueType
                } }
            }, { runValidators: true })
        }else{
            return res.json({ status : "cannot assign !" })
        }
        return res.json({
                status : `assign to ${assign} complete !`
        })
    }else{
        return res.json([])
    }

  }catch(err){
    console.log(err.message);
    return res.status(400).send({
        status: 400,
        erro: "some thing went wrong"
    })
  }

}
