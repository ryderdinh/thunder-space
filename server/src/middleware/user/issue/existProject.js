const Response = require('../../../models/Response')
const Project = require('../../../models/Project')
const logger = require('../../../../config/logger')
module.exports = async function (req, res, next) {
  try {
    logger.info('Issue middleware check exist project')
    const pid = req.params.pid
    const uid = req.user.id
    const existProject = await Project.findOne({
      _id: pid,
      deleted: false
    }).elemMatch('member', { uid: uid })
    if (!existProject)
      return res.status(400).send(new Response(400, 'project is not available'))
    req.existProject = existProject
    next()
  } catch (err) {
    logger.error(err.message)
    return res.status(400).send(new Response(400, 'something went wrong !'))
  }
}
