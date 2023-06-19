const router = require('express').Router()
const authenticateToken = require('../../middleware/user/login/authenticateToken')
const apiGetOneIssueInProject = require('../../controller/users/issue/apiGetOneIssueInProject')
const apiGetAllIssueInProject = require('../../controller/users/issue/apiGetAllIssueInProject')
const apiDeleteOneIssue = require('../../controller/users/issue/apiDeleteOneIssue')
const apiUpdateOneIssue = require('../../controller/users/issue/apiUpdateOneIssue')
const createIssue = require('../../controller/users/issue/createIssue')
const apiPostFile = require('../../controller/users/issue/apiUploadFIle')
const getHistory = require('../../controller/users/issue/getHistories')
const changeStatus = require('../../controller/users/issue/changeStatus')
const validate = require('../../middleware/user/validate')
const issueMiddleware = require('../../middleware/user/issue/index')
//Get one issue
exports.apiGetOneIssueInProject = router.get(
  '/issues/:iid',
  authenticateToken,
  issueMiddleware.existProjectToGetOne,
  apiGetOneIssueInProject
)
//Get all issues in a project
exports.apiGetAllIssueInProject = router.get(
  '/projects/:pid/issues',
  authenticateToken,
  apiGetAllIssueInProject
)
//Delete one issue
exports.apiDeleteOneIssue = router.delete(
  '/issues/:iid',
  authenticateToken,
  apiDeleteOneIssue
)
//Update one isse
exports.apiUpdateOneIssue = router.put(
  '/issues/:iid',
  authenticateToken,
  validate('issueValidation', 'updateIssue'),
  apiUpdateOneIssue
)
//Assign a issue for a member in project
exports.createIssue = router.post(
  '/projects/:pid/issues/create',
  authenticateToken,
  validate('issueValidation', 'createIssue'),
  issueMiddleware.existProjectToCreate,
  issueMiddleware.existUserAssigned,
  createIssue
)

//Assign change status
exports.changeStatus = router.patch(
  '/issues/:iid',
  authenticateToken,
  validate('issueValidation', 'changeStatus'),
  changeStatus
)
//Get history in issue
exports.getHistory = router.get(
  '/issues/:iid/history',
  authenticateToken,
  getHistory
)

//Upload attachment
exports.apiPostFile = router.post(
  '/upload/file',
  authenticateToken,
  apiPostFile
)
