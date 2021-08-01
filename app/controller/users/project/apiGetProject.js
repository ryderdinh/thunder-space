const router = require("express").Router()
const Project = require("../../../models/project")

router.get("/projectInfo/:id", async (req, res, next) => {
    try{
        const uid = req.params.id
        const code = req.query.projectCode
        var existProject
        if(code.length == 0 || code == null){
             existProject = await Project.find({
                member  : { $elemMatch : { uid : uid } }
            })
        }else{
            existProject = await Project.find({
                code : code,
                member  : { $elemMatch : { uid : uid } }
            })
        }
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
    }

})

module.exports = router