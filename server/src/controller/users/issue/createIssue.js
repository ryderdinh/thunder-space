const logger = require('../../../../config/logger')
const Response = require('../../../models/Response')
const service = require('../../../services/index')
module.exports = async (req, res, next) => {
  try {
    const { id: uid, name: creatorName } = req.user
    const { existProject, assign } = req
    const { pid } = req.params
    const code =
      existProject.seqcode === 0
        ? `${existProject.code}-${existProject.issue.length + 1}`
        : `${existProject.code}${existProject.seqcode}-${
            existProject.issue.length + 1
          }`
    const newIssue = await service.issue.createIssue({
      ...req.body,
      code,
      pid,
      assign,
      uid
    })
    if (newIssue.message) {
      logger.error(newIssue.message)
      return res.status(400).send(new Response(400, err.message))
    }
    //Save to project
    existProject.issue.push({ iid: newIssue.id })
    await existProject.save()
    const usersInHis =
      assign == null
        ? [
            [
              {
                uid: uid
              }
            ],
            [
              {
                uid: uid
              }
            ]
          ]
        : [
            [
              {
                uid: uid
              }
            ],
            [
              {
                uid: uid
              },
              {
                uid: assign
              }
            ]
          ]
    await service.history.createForIssue(
      newIssue.id,
      usersInHis,
      ['created an issue', 'assigned an issue to'],
      'issue'
    )
    const io = req.app.get('socketio')
    io.to(assign.toString()).emit('notification', {
      content: `you have received an assigning to do an issue by ${creatorName}`,
      type: 'assign-issue'
    })
    return res.status(200).send(new Response(200, 'success', newIssue))
  } catch (err) {
    console.log(err);
    logger.error(err)
    return res.status(400).send(new Response(400, 'something went wrong'))
  }
}
