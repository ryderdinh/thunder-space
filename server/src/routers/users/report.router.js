const router = require('express').Router()
const authenticateToken = require('../../middleware/user/login/authenticateToken')
const apiPostReport = require('../../controller/users/report/apiPostReport')
const apiGetReport = require('../../controller/users/report/apiGetReport')

exports.apiPostReport = router.post('/report',  authenticateToken, apiPostReport)

exports.apiGetReport = router.get('/reports', authenticateToken, apiGetReport) 