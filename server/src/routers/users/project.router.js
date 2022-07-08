const authenticateToken = require('../../middleware/user/login/authenticateToken')
const apiGetProject = require('../../controller/users/project/apiGetProject')
const apiPostProject = require('../../controller/users/project/apiPostProject')
const apiGetFindProject = require('../../controller/users/project/apiFindProject')
const apiDeleteProject = require("../../controller/users/project/apiDeleteProject")
const apiPutUpdateProject = require("../../controller/users/project/apiPutUpdateProject")
const apiPatchAddMemberToProject = require("../../controller/users/project/apiPatchAddMemberToProject")
const apiPatchDeleteMemberOfProject = require("../../controller/users/project/apiPatchDeleteMemberOfProject")
const apiPatchChangeRole =  require("../../controller/users/project/apiPatchChangeRole")
const apiPatchAcceptInvitation =  require("../../controller/users/project/apiPatchAcceptInvitation")
const apiPatchRejectInvitation =  require("../../controller/users/project/apiPatchRejectInvitation")
const router = require('express').Router()

//Get all project
exports.apiGetProject = router.get('/projects', authenticateToken, apiGetProject)
//Create new project
exports.apiPostProject = router.post('/projects/create', authenticateToken, apiPostProject)
//Add more member to project
exports.apiPatchAddMemberToProject = router.patch("/projects/:id/members/add", authenticateToken, apiPatchAddMemberToProject)
//Find one project
exports.apiGetFindProject = router.get('/projects/:id', authenticateToken, apiGetFindProject)
//Delete Project
exports.apiDeleteProject = router.delete('/projects/:id', authenticateToken, apiDeleteProject)
//Update project
exports.apiPutUpdateProject = router.put("/projects/:id", authenticateToken, apiPutUpdateProject)
//Delete member 
exports.apiPatchDeleteMemberOfProject = router.delete("/projects/:pid/members/:uid", authenticateToken, apiPatchDeleteMemberOfProject)
//Change role 
exports.apiPatchChangeRole = router.patch("/projects/:pid/members/:uid", authenticateToken, apiPatchChangeRole)
//Accept Invitation
exports.apiPatchAcceptInvitation = router.patch("/projects/:pid/invitations/accept", authenticateToken, apiPatchAcceptInvitation)
//Reject Invitation
exports.apiPatchRejectInvitation = router.patch("/projects/:pid/invitations/reject", authenticateToken, apiPatchRejectInvitation)