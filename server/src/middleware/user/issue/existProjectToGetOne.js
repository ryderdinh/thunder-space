const Response = require('../../../models/Response')
const Project = require('../../../models/Project')
const Issue = require('../../../models/Issue')
const service = require('../../../services/index')
const logger = require('../../../../config/logger')
module.exports = async function (req, res, next) {
  try {
    logger.info('Issue middleware check exist project to get one')
    const iid = req.params.iid
    const uid = req.user.id
    // //Check exist project
    const issue = await Issue.findOne({ _id: iid })
    if (!issue)
      return res.status(400).send(new Response(400, 'issue does not exist'))
    const existProject = await service.project.getOneProjectByIssue(
      uid,
      issue,
      ['_id'],
      true
    )
    if (!existProject)
      return res.status(400).send(new Response(400, 'project is not available'))
    req.issue = issue
    next()
  } catch (err) {
    logger.error(err.message)
    return res.status(400).send(new Response(400, 'something went wrong'))
  }
}
