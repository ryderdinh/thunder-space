const Project = require("../../../models/project")
const Staff = require("../../../models/staffInformation")
const router = require("express").Router()
const authenticateToken = require("../../../../middleware/user/login/authenticateToken")
const { v4: uuidv4 } = require('uuid');
const { findById } = require("../../../models/staffInformation");
const { set } = require("mongoose");
router.post("/createProject/:id", async (req, res, next) => {
    try {
        const userId = req.params.id
        // const project =  JSON.parse(Object.keys(req.body)[0]);
        const pid = uuidv4()
        // console.log(req.body);
        const code = req.body.projectCode
        const name = req.body.projectName
        var manager = [... new Set(req.body.projectManager.map(e => e = e.email))]
        var member = [... new Set(req.body.projectMember.map(e => e = e.email))]
        const existCreater = await Staff.findById(userId)
        // console.log(existCreater);
        if(!existCreater){
            return res.json({
                data: {
                    status: "You are not access to project !"
                }
            })
        }else{
        const tempManager =  manager.findIndex( e => e === existCreater.email)
          if (tempManager < 0 ) {
              manager.push(existCreater.email)
          } 
          const tempMember = member.findIndex( e => e === existCreater.email)
          if ( tempMember  >= 0 ) {
              member.splice(tempMember, 1)
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
        if(existManager.length >= 1){
                for (let i =0; i < existManager.length; i++){
                        existManager[i] = {
                            uid : existManager[i].id,
                            name : existManager[i].name
                        }
                }
                manager = existManager
        }
        if(existMember.length > 0){
            for (let i =0; i < existMember.length; i++){
                existMember[i] = {
                    uid : existMember[i].id,
                    name : existMember[i].name
                }
        }
        member = existMember.concat(manager)
        }else{
        member = existMember.concat(manager)
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