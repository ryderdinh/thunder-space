const router = require("express").Router()
const authenticateToken = require("../../middleware/user/login/authenticateToken")
const apiPutLocation  = require('../../controller/users/timeKeeping/location')
const apiGetTimeLine  = require('../../controller/users/timeKeeping/timeline')

//Checkin
exports.apiPutLocation = router.put("/location", authenticateToken, apiPutLocation)
// //Get time line
exports.apiGetTimeLine = router.get("/timeline", authenticateToken, apiGetTimeLine)

