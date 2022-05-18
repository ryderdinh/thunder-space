const router = require("express").Router()
const authenticateToken = require("../../middleware/user/login/authenticateToken")
const apiGetOneIssueInProject = require("../../controller/users/issue/apiGetOneIssueInProject")
const apiGetAllIssueInProject = require("../../controller/users/issue/apiGetAllIssueInProject")
const apiPostIssue = require("../../controller/users/issue/apiPostIssue")
const apiPostFile = require("../../controller/users/issue/apiUploadFIle")
//Get one issue
exports.apiGetOneIssueInProject = router.get('/projects/:pid/issues/:iid', authenticateToken, apiGetOneIssueInProject)
//Get all issues in a project
exports.apiGetAllIssueInProject = router.get("/projects/:pid/issues", authenticateToken, apiGetAllIssueInProject)
//Assign a issue for a member in project
exports.apiPostIssue = router.post('/projects/:pid/issues/create', authenticateToken, apiPostIssue)
//Upload attachment
exports.apiPostFile = router.post("/upload/file", authenticateToken, apiPostFile)
