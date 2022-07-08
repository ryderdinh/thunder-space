const apiGetNotifications = require("../../controller/users/notification/apiGetNotifications")
const router = require("express").Router();
const authenticateToken = require("../../middleware/user/login/authenticateToken")
exports.apiGetNotifications = router.get("/notifications", authenticateToken, apiGetNotifications)
