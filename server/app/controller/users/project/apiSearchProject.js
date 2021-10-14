const router = require("express").Router()
const Project = require("../../../models/project")

router.get("/searchProject/:id", async (req, res, next) => {
    try{
        const uid = req.params.id
        const code  = req.query.projectCode
        const existProject = await Project.find({
            code : code,
            member  : { $elemMatch : { uid : uid } }
        })
        if(!existProject || existProject.length == 0 ){
            return res.json({
                data : {
                    status : "Some thing went wrong !"
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