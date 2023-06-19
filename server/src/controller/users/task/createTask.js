const Response = require('../../../models/Response')
const logger = require('../../../../config/logger')
const service = require('../../../services/index')
module.exports = async (req, res, next) => {
  const { id: uid } = req.user
  const result = await service.task.createTask(uid, req.body)
  if (result.message) {
    logger.error(result.message)
    return res.status(400).send(new Response(400,'something went wrong'))
  }
  return res.status(200).send(new Response(200, 'success', result))
}
