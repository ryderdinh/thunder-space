const router = require("express").Router()
const { exist } = require("joi")
const { exit } = require("shelljs")
const Project = require("../../../models/project")

router.get("/projectInfo/:id", async (req, res, next) => {
    try{
        const uid = req.params.id
        const code = req.query.projectCode
        // console.log(code);
        const search = req.query.search
        // console.log(code);
        var existProject
        var existMember
        var temp
        if( search === "member" && code != undefined ){
            existMember = await Project.find({
                code : code,
                member  : { $elemMatch : { uid : uid } }
            })
            // console.log(existMember);
          
            if(existMember.length > 0){
                for(let i=0; i< existMember[0].member.length ; i++){
                    existMember[0].member[i] = {
                        uid : existMember[0].member[i].uid,
                        name : existMember[0].member[i].name,
                        email : existMember[0].member[i].email,
                        avatar : existMember[0].member[i].avatar,
                    }
                }
                return res.json(existMember[0].member)
            }else{
                return res.json(existMember)
            }
        }

        if(code == undefined ){
             existProject = await Project.find({
                member  : { $elemMatch : { uid : uid } }
            },  { _id: false }).lean()
        }else{
            existProject = await Project.find({
                code : code,
                member  : { $elemMatch : { uid : uid } },
            },  { _id: false }).lean()
        }
        console.log(existProject);
        // console.log(managerProject);
        if(!existProject || existProject.length == 0 ){
            return res.json({
                data : {
                    status : "You are not in any project !"
                }
        })
        }else{
            for(let i=0; i< existProject.length; i++){
                existProject[i] = {
                    projectId : existProject[i].pid,
                    projectCode : existProject[i].code,
                    projectName : existProject[i].name,
                    projectIssue : existProject[i].issue
                }
            }
            // console.log(existProject);
            return res.json(existProject)
        }
    }catch(err){
        console.log(err);
        return res.json({
            data : {
                status : "Something went wrong !"
            }
        })
    }

})

module.exports = router