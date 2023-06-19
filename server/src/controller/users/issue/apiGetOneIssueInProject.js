const Response = require('../../../models/Response')
const Issue = require('../../../models/Issue')
const Project = require('../../../models/Project')
const service = require('../../../services/index')
const logger = require('../../../../config/logger')
module.exports = async (req, res, next) => {
  try {
    const { issue } = req
    const result = await service.issue.getDetailsIssueById(issue._id)
    if (result.message)
      return res.status(400).send(new Response(400, result.message))
    return res.status(200).send(new Response(200, 'success', result))
  } catch (err) {
    logger.error(err.message)
    return res.status(400).send(new Response(400, 'something went wrong'))
  }
}
