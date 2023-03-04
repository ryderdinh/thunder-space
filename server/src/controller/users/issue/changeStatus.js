const Issue = require('../../../models/Issue')
const Project = require('../../../models/Project')
const History = require('../../../models/History')
const Notification = require('../../../models/Notification')
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
    if (result.mustNoti) {
      await Notification.create(result.notification)
      io.to(result.room).emit('notification', result.notification)
    }
    return res.status(200).send(new Response(200, 'success'))
  } catch (err) {
    console.log(err);
    logger.error(err.message)
    return res.status(400).send(new Response(400, err.message))
  }
}
