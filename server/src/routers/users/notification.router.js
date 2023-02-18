const router = require("express").Router();
const apiGetNotifications = require("../../controller/users/notification/apiGetNotifications")
const authenticateToken = require("../../middleware/user/login/authenticateToken")
exports.apiGetNotifications = router.get("/notifications", authenticateToken, apiGetNotifications)
