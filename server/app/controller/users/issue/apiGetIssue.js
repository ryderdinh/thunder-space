const router = require("express").Router()
const Issue = require("../../../models/issue")

router.get("/issueInfo/:iid", async (req, res, next) => {
    try {
        const iid = req.params.iid
        const existIssue = await Issue.findOne({iid : iid})
        if(existIssue){
            return res.json(existIssue)
        }else{
           return res.json({
               status : "Issue is not available !"
           }) 
        }
    } catch (error) {
        return res.json({
            status : "Something went wrong !"
        })
    }
})

module.exports = router