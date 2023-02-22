const Issue = require('../../../models/Issue')
const Project = require('../../../models/Project')
const Staff = require('../../../models/Staff')
const logger = require('../../../../config/logger')
const Response = require('../../../models/Response')
const service = require('../../../services/index')
module.exports = async (req, res, next) => {
  try {
    const { iid } = req.params
    const { id: uid } = req.user
    const { status } = req.body
    const io = req.app.get('socketio')
    const result = await service.issue.changeStatus(iid, uid, status)
    if (!result)
      return res.status(400).send(new Response(400, 'can not change status'))
    console.log(result.room)
    io.to(result.room).emit('notification', result.message)
    return res.status(200).send(new Response(200, 'success'))
  } catch (err) {
    logger.error(err.message)
    return res.status(400).send(new Response(400, err.message))
  }
}
