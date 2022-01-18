const authenticateToken = require('../../middleware/user/login/authenticateToken')
const apiGetProject = require('../../controller/users/project/apiGetProject')
const apiPostProject = require('../../controller/users/project/apiPostProject')
const apiGetSearchProject = require('../../controller/users/project/apiSearchProject')

const router = require('express').Router()

exports.apiGetProject = router.get('/projects', authenticateToken, apiGetProject)
exports.apiPostProject = router.post('/project', authenticateToken, apiPostProject)
exports.apiGetSearchProject = router.get('/project/:pid', authenticateToken, apiGetSearchProject)