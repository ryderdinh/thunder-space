const router = require("express").Router()
const Project = require("../../../models/project")
const Staff = require("../../../models/Staff")
const Issue = require("../../../models/issue")
const { v4: uuidv4 } = require('uuid');
const { exist } = require("joi");

module.exports = async (req, res, next) => {
  try{
    const uid = req.params.uid
    const pid = req.params.pid
    const name = req.body.issueName
    const type = req.body.issueType
    const assign = req.body.issueAssign
    const priority = req.body.issuePriority
    const description = req.body.issueDescription
    const existProject = await Project.findOne({ pid : pid , member  : { $elemMatch : { uid : uid } } })
    const existUser = await Staff.findOne({ email : assign })
    if(existProject && existUser){
        let creator = existProject.member.find(e => e.uid === uid ) 
        let assigned = existProject.member.find(e => e.uid === existUser.id) 
        console.log(assigned);
        let icode = `${existProject.code}-${existProject.issue.length + 1}`
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
                status : "The person you assign is not available or not in your project ! "
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
            return res.json({ status : "Cannot assign !" })
        }
        return res.json({
                status : `Assign to ${assign} complete !`
        })
    }else{
        return res.json([])
    }

  }catch(err){
    console.log(err.message);
    return res.json({
        data : {
            status : "Something went wrong !"
        }
    })
  }

}
