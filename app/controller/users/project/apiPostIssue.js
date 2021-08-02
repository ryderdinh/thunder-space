const router = require("express").Router()
const Project = require("../../../models/project")

router.post("/createIssue/:uid/:pid", (req, res, next) => {
    const uid = req.params.uid
    const pid = req.params.pid
    const name = req.body.issueName
    const type = req.body.issueType
    const assign = req.body.issuAssign
    const priority = req.body.issuePriority
    const description = req.body.issueDescription

    
})

module.exports = router