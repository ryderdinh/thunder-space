const router = require("express").Router()
const authenticateToken = require("../../middleware/user/login/authenticateToken")
const apiGetOneIssueInProject = require("../../controller/users/issue/apiGetOneIssueInProject")
const apiGetAllIssueInProject = require("../../controller/users/issue/apiGetAllIssueInProject")
const apiDeleteOneIssue = require("../../controller/users/issue/apiDeleteOneIssue")
const apiUpdateOneIssue = require("../../controller/users/issue/apiUpdateOneIssue")
const apiPostIssue = require("../../controller/users/issue/apiPostIssue")
const apiPostFile = require("../../controller/users/issue/apiUploadFIle")
const validate = require('../../middleware/user/validate');
//Get one issue
exports.apiGetOneIssueInProject = router.get('/issues/:iid', authenticateToken, apiGetOneIssueInProject)
//Get all issues in a project
exports.apiGetAllIssueInProject = router.get("/projects/:pid/issues", authenticateToken, apiGetAllIssueInProject)
//Delete one issue
exports.apiDeleteOneIssue = router.delete("/issues/:iid", authenticateToken, apiDeleteOneIssue)
//Update one isse
exports.apiUpdateOneIssue = router.put("/issues/:iid", authenticateToken, validate('updateIssue'),  apiUpdateOneIssue)
//Assign a issue for a member in project
exports.apiPostIssue = router.post('/projects/:pid/issues/create', authenticateToken, apiPostIssue)
//Upload attachment
exports.apiPostFile = router.post("/upload/file", authenticateToken, apiPostFile)

