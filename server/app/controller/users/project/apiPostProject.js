const Project = require("../../../models/project")
const Staff = require("../../../models/staffInformation")
const router = require("express").Router()
const authenticateToken = require("../../../../middleware/user/login/authenticateToken")
const { v4: uuidv4 } = require('uuid');

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
        //Valid creater
        
        var existCreater = await Staff.findById(userId)
        if (!existCreater) {
            return res.json({
                data: {
                    status: "You can not create to project !"
                }
            })
        } else{
            if(manager.find(e => e === existCreater.email) == undefined && member.find(e => e === existCreater.email) == undefined){
                manager.push(existCreater.email)
                member.push(existCreater.email)
            }
        }
        const existCode = await Project.findOne({
            code: code
        })
        var existManager = await Staff.find({
            email: manager
        })
        // console.log(existManager);
        var existMember = await Staff.find({
            email: member
        })
        // console.log(existCreater);
          
        //Valid code 
        if (existCode) {
            return res.json({
                data: {
                    status: "Code has been created !"
                }
            })
        }
        //Valid exsit member
        if (existManager.length > 0 && existMember.length > 0) {
            //Check data 
            for(let i =0 ; i < manager.length; i++){
               let check = member.find(e => e === manager[i])
               if(check == undefined) return res.json({
                data: {
                    status: "Wrong data request !"
                }
            })
            }
            //Map manager data
            for (let i = 0; i < existManager.length; i++) {
                existManager[i] = {
                    uid: existManager[i].id,
                    name: existManager[i].name,
                    email : existManager[i].email,
                    avatar : existManager[i].avatar.url
                }
            }
            //Map  member data
            for (let i = 0; i < existMember.length; i++) {
                existMember[i] = {
                    uid: existMember[i].id,
                    name: existMember[i].name,
                    email : existMember[i].email,
                    avatar : existMember[i].avatar.url
                }
            }

        }
        //Create project
        const result = await Project.create({
            pid: pid,
            code: code,
            name: name,
            manager: existManager,
            member: existMember
        })  
        result.save()
        return res.json({
            data: {
                status: "Create project successfully !"
            }
        })
    }catch(err) {
        if (err) {
            console.log(err);
            return res.json({
                data: {
                    status: "Something went wrong !"
                }
            })
        }
    }
})


module.exports = router