const router = require('express').Router()
const authenticateToken = require('../../middleware/user/login/authenticateToken')
const apiPutLocation = require('../../controller/users/timeKeeping/location')
const apiGetTimeLine = require('../../controller/users/timeKeeping/timeline')
const validate = require('../../middleware/user/validate')
//Checkin
exports.apiPutLocation = router.put(
  '/location',
    authenticateToken,
  validate('userValidation', 'location'),
  apiPutLocation
)
// //Get time line
exports.apiGetTimeLine = router.get(
  '/timeline',
  authenticateToken,
  apiGetTimeLine
)
