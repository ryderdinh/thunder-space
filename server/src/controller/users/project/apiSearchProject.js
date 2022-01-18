const router = require("express").Router()
const Project = require("../../../models/Project")

module.exports = async (req, res, next) => {
    try{
        const uid = req.user.id
        const code  = req.query.projectCode
        const existProject = await Project.find({
            code : code,
            member  : { $elemMatch : { uid : uid } }
        })
        if(!existProject || existProject.length == 0 ){
            return res.status(404).send("project does not exist")
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
       return res.status(400).send('some thing went wrong')
    }
}

module.exports = router