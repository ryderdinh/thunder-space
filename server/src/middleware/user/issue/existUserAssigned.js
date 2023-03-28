const Response = require('../../../models/Response')
const Staff = require('../../../models/Staff')
const logger = require('../../../../config/logger')
module.exports = async function (req, res, next) {
  try {
    logger.info('Issue middleware check exist user assgined')
    const { assigned } = req.body
    const { existProject } = req
    const existUserAssigned = await Staff.findOne({ email: assigned }).select(
      '_id'
    )
    const members = (await existProject.populate('members')).member
    let userAssignedBelongtoProject
    if (existUserAssigned) {
      userAssignedBelongtoProject = members.find(
        (member) => member.uid.toString() === existUserAssigned._id.toString()
      )
    }
    if (!userAssignedBelongtoProject && assigned != '')
      return res
        .status(400)
        .send(new Response(400, 'user is assgined is not valid'))

    const assign = assigned === '' ? null : existUserAssigned.id
    req.assign = assign
    next()
  } catch (err) {
    logger.error(err.message)
    return res.status(400).send(new Response(400, 'something went wrong'))
  }
}
