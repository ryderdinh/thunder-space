const router = require("express").Router()
const authenticateToken = require("../../middleware/user/login/authenticateToken")
const apiPostToken  = require('../../controller/users/access/getToken')
const apiGetLogin= require('../../controller/users/access/login')
const apiPostLogOutAll = require('../../controller/users/access/logOutAll')
const apiPostLogOut = require('../../controller/users/access/logOut')
const apiPutChangePassword = require("../../controller/users/access/changePassword")
const apiPostForgetPassword = require("../../controller/users/access/forgetPassword")
const apiPostResetPassword = require("../../controller/users/access/resetPassword")
//Create a token
exports.apiPostToken = router.post("/token", apiPostToken)
//User token to login
exports.apiGetLogin = router.get("/login", authenticateToken, apiGetLogin)
//User logout
exports.apiPostLogOut = router.post('/logout', authenticateToken, apiPostLogOut)
//User logoutAll
exports.apiPostLogOutAll = router.post('/logout-all', authenticateToken, apiPostLogOutAll)
//Change password for current user
exports.apiPutChangePassword = router.put("/change-password", authenticateToken, apiPutChangePassword)
//Forget password
exports.apiPostForgetPassword = router.post('/forget-password', apiPostForgetPassword)
//Reset password
exports.apiPostResetPassword = router.post('/reset-password/:resetToken', apiPostResetPassword)