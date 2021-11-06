const router = require("express").Router()
const authenticateToken = require("../../../middleware/user/login/authenticateToken")
const apiGetEvent = require('../../controller/users/event/apiGetEvent')

//Get event's information
exports.apiGetEvent = router.get("/event",authenticateToken, apiGetEvent)