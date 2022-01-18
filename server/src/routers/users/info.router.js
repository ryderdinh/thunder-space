const router = require("express").Router()
const authenticateToken = require("../../middleware/user/login/authenticateToken")
const apiGetUserInfo = require('../../controller/users/info/apiGetUserInfo')
const apiGetSearchUser = require('../../controller/users/info/searchUser')
const apiPutUploadAvatar = require('../../controller/users/info/uploadAvatar')
//Get current user's infor
exports.apiGetUserInfo = router.get('/users/:id', authenticateToken, apiGetUserInfo)
//Get any user's info
exports.apiGetSearchUser = router.get('/search-user', authenticateToken, apiGetSearchUser)
//Change avatar for current user
exports.apiPutUploadAvatar = router.put('/upload/avatar', authenticateToken, apiPutUploadAvatar)
