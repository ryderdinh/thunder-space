const Response = require('../../../models/Response')
const logger = require('../../../../config/logger')
const service = require('../../../services/index')
module.exports = async (req, res, next) => {
  const { tid } = req.params
  const result = await service.task.updateTask(tid, req.body)
  if (result.message) {
    logger.error(result.message)
    return res.status(400).send(new Response('something went wrong'))
  }
  return res.status(200).send(new Response(200, 'success', result))
}
