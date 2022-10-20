const router = require("express").Router()
const authenticateToken = require("../../middleware/user/login/authenticateToken")
const apiGetUserInfo = require('../../controller/users/info/apiGetUserInfo')
const apiGetAllUser = require('../../controller/users/info/apiGetAllUser')
const apiPutUploadAvatar = require('../../controller/users/info/uploadAvatar')
const apiGetSearchUser = require('../../controller/users/info/apiGetSearchUser')
const apiGetProfile = require('../../controller/users/info/apiGetProfile')
//Get one user
exports.apiGetUserInfo = router.get('/users/:uid', authenticateToken, apiGetUserInfo),
//Get any user's info
exports.apiGetAllUser = router.get("/users", authenticateToken, apiGetAllUser)
//Change avatar for current user
exports.apiPutUploadAvatar = router.put('/upload/avatar', authenticateToken, apiPutUploadAvatar)
///Search user with contain value in email
exports.apiGetSearchUser = router.get('/search/users', authenticateToken, apiGetSearchUser)
///Get Profile
exports.apiGetProfile = router.get('/user', authenticateToken, apiGetProfile)
