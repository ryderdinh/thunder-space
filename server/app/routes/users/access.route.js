const router = require("express").Router()
const authenticateToken = require("../../../middleware/user/login/authenticateToken")
const apiPostToken  = require('../../controller/users/access/loginToken')
const apiGetLogin= require('../../controller/users/access/loginUser')
const apiPutChangePassword = require("../../controller/users/access/changePassword")

//Create a token
exports.apiPostToken = router.post("/token", apiPostToken)
//Use token to login
exports.apiGetLogin = router.get("/login", authenticateToken, apiGetLogin)
//Change password for current user
exports.apiPutChangePassword = router.put("/change-password/:id", authenticateToken, apiPutChangePassword)


