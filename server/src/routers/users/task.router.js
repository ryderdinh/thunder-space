const router = require('express').Router()
const authenticateToken = require('../../middleware/user/login/authenticateToken')
const taskController = require('../../controller/users/task/index')
const validate = require('../../middleware/user/validate')

exports.createTask = router.post(
  '/tasks',
  validate('taskValidation', 'createTask'),
  authenticateToken,
  taskController.createTask
)
exports.getTasks = router.get(
  '/tasks',
  authenticateToken,
  taskController.getTasks
)
exports.updateTask = router.patch(
  '/tasks/:tid',
  authenticateToken,
  validate('taskValidation', 'updateTask'),
  taskController.updateTask
)

exports.changeIndex = router.patch(
  '/tasks',
  authenticateToken,
  validate('taskValidation', 'changeIndex'),
  taskController.changeIndex
)

exports.deleteTasks = router.delete(
  '/tasks',
  authenticateToken,
  validate('taskValidation', 'deleteTasks'),
  taskController.deleteTasks
)
