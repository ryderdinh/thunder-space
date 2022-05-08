const router = require("express").Router()
const authenticateToken = require("../../middleware/user/login/authenticateToken")
const apiGetIssue = require("../../controller/users/issue/apiGetIssue")
const apiPostIssue = require("../../controller/users/issue/apiPostIssue")
const apiPostFile = require("../../controller/users/issue/apiUploadFIle")
//Get issue's infor
exports.apiGetIssue = router.get('/issues', authenticateToken, apiGetIssue)
//Assign a issue for a member in project
exports.apiPostIssue = router.post('/projects/:pid/issues/create', authenticateToken, apiPostIssue)
//Upload attachment
exports.apiPostFile = router.post("/upload/file", authenticateToken, apiPostFile)
