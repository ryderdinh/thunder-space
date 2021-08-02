const router = require("express").Router()
const Project = require("../../../models/project")
const Staff = require("../../../models/staffInformation")
const { v4: uuidv4 } = require('uuid');
const { exist } = require("joi");

router.post("/createIssue/:uid/:pid", async (req, res, next) => {
  try{
    const uid = req.params.uid
    const pid = req.params.pid
    const name = req.body.issueName
    const type = req.body.issueType
    const assign = req.body.issueAssign
    const priority = req.body.issuePriority
    const description = req.body.issueDescription
    const existProject = await Project.findOne({ pid : pid , member  : { $elemMatch : { uid : uid } } })
    
    if(existProject){
        let creator = existProject.member.find(e => e.uid === uid ) 
        let assigned = existProject.member.find(e => e.email === assign ) 
        let icode = `${existProject.code}-${existProject.issue.length + 1}`
        // console.log(icode);
        var assignedPerson
        let creatorInfo = {
            uid : creator.uid,
            name : creator.name,
            email : creator.email,
            avatar : creator.avatar
        }
        // console.log(creatorInfo);
        if(assigned){
            assignedPerson = {
                uid : assigned.uid,
                name : assigned.name,
                email : assigned.email,
                avatar : assigned.avatar,
            }
        }else{
            res.json({ data : {
                status : "The person you assign is not available or not in your project ! "
            } })
        }
        // console.log(creatorInfo);
        let result = {
            iid : uuidv4(),
            issueName : name,
            issueCode : icode,
            issueType : type,
            issueCreator : creatorInfo,
            issueAssign : assignedPerson,
            issueDescription : description,
            issuePriority : priority
        }
         const update = await Project.findOneAndUpdate({pid : pid},{ 
            $push : { issue : result }
        },  { runValidators: true })

        return res.json({
            data : {
                status : `Assign to ${assign} complete !`
            }
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

})

module.exports = router