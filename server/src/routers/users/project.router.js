const authenticateToken = require('../../middleware/user/login/authenticateToken')
const apiGetProject = require('../../controller/users/project/apiGetProject')
const apiPostProject = require('../../controller/users/project/apiPostProject')
const apiGetSearchProject = require('../../controller/users/project/apiSearchProject')
const apiPatchAddMemberToProject = require("../../controller/users/project/apiPatchAddMemberToProject")
const { authenticate } = require('passport')
const router = require('express').Router()

//Get all project
exports.apiGetProject = router.get('/projects', authenticateToken, apiGetProject)
//Create new project
exports.apiPostProject = router.post('/projects/create', authenticateToken, apiPostProject)
//Add more member to project
exports.apiPatchAddMemberToProject = router.patch("/projects/add-member/:uid", authenticateToken, apiPatchAddMemberToProject)
//Find one project
exports.apiGetSearchProject = router.get('/project', authenticateToken, apiGetSearchProject)