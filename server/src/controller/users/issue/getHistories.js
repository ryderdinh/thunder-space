const logger = require('../../../../config/logger')
const Issue = require('../../../models/Issue')
const Response = require('../../../models/Response')
const service = require('../../../services/index')
module.exports = async (req, res, next) => {
  try {
    const { iid } = req.params
    const { skip } = req.query
    const { id: uid } = req.user
    const checkUserInIssue = await service.issue.userInIssue(iid, uid)
    if (!checkUserInIssue) {
      return res
        .status(400)
        .send(new Response(400, 'can not get history in this issue'))
    }
    const result = await service.history.getInIssue(iid, skip)
    if (!result)
      return res.status(400).send(new Response(400, 'there is no history'))
    return res.status(200).send(new Response(200, 'success', result))
  } catch (err) {
    logger.error(err.message)
    return res.status(400).send(new Response(400, err.message))
  }
}
