const Project = require("../../../models/project")
const Staff = require("../../../models/staffInformation")
const router = require("express").Router()
const authenticateToken = require("../../../../middleware/authenticateToken")
const { v4: uuidv4 } = require('uuid');
router.post("/createProject/:id", async (req, res, next) => {
    try {
        const userId = req.params.id
        // const project =  JSON.parse(Object.keys(req.body)[0]);
        const pid = uuidv4()
        console.log(req.body);
        const code = req.body.projectCode
        const name = req.body.projectName
        var manager = req.body.projectManager
        var member = req.body.projectMember
        for(let i = 0; i< manager.length; i++){
            for(let j =0; j< member.length; j++){
                if(manager[i] === member[j]){
                  return  res.json({
                        data: {
                            status: "Member is not same manager !"
                        }
                    })
                }
            }
        }
        const existCode = await Project.findOne({
            code: code
        })
        const existManager = await Staff.find({
            email: manager
        })
        // console.log(manager);
        const existMember = await Staff.find({
            email : member
        })
        if (existCode) {
           return res.json({
                data: {
                    status: "Code has been created !"
                }
            })
        }
        // console.log(existManager);
        if(existManager.length == 0){
         return   res.json({
                data: {
                    status: "Manager is invalid !"
                }
            })
        }else{
                for (let i =0; i < existManager.length; i++){
                        existManager[i] = {
                            uid : existManager[i].id,
                            name : existManager[i].name
                        }
                }
                manager = existManager
        }
        if(existMember.length == 0){
           return res.json({
                data: {
                    status: "Member is invalid !"
                }
            })
        }else{
            for (let i =0; i < existMember.length; i++){
                existMember[i] = {
                    uid : existMember[i].id,
                    name : existMember[i].name
                }
        }
        member = existMember
        }
      const result =  await Project.create({
          pid : pid,
          code : code,
          name : name,
          manager : manager,
          member : member
      })
      result.save()
     return res.json({data : {
        status : "Create project successfully !"
    }})
    } catch (err) {
        if(err){
            console.log(err);
           return res.json({data : {
                status : "Something went wrong !"
            }})
        }
    }
})


module.exports = router