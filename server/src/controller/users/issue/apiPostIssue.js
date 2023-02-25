const Project = require('../../../models/Project')
const Staff = require('../../../models/Staff')
const Issue = require('../../../models/Issue')
const Response = require('../../../models/Response')
module.exports = async (req, res, next) => {
  try {
    const { id: uid, name: creatorName } = req.user
    const { existProject, assign } = req
    //params
    const pid = req.params.pid
    //body
    const {
      name,
      type,
      estimate,
      priority,
      description = '',
      status = 'pending'
    } = req.body

    const newIssue = new Issue({
      name,
      code:
        existProject.seqcode === 0
          ? `${existProject.code}-${existProject.issue.length + 1}`
          : `${existProject.code}${existProject.seqcode}-${
              existProject.issue.length + 1
            }`,
      type,
      creator: uid,
      assign,
      estimate: {
        start: Date.now(),
        end: estimate
      },
      description,
      priority,
      history:
        assign == null
          ? [
              {
                time: Date.now(),
                action: 'created an issue',
                user: [
                  {
                    uid: uid
                  }
                ]
              }
            ]
          : [
              {
                time: Date.now(),
                action: 'created an issue',
                user: [
                  {
                    uid: uid
                  }
                ]
              },
              {
                time: Date.now(),
                action: 'assigned an issue to',
                user: [
                  {
                    uid: uid
                  },
                  {
                    uid: assign
                  }
                ]
              }
            ],
      project: pid,
      status
    })
    const err = newIssue.validateSync()
    if (err) return res.status(400).send(new Response(400, err.message))
    //Save to project
    existProject.issue.push({ iid: newIssue.id })
    await existProject.save()
    const io = req.app.get('socketio')
    io.to(assign.toString()).emit(
      'notification',
      {
        content: `you have received an assigning to do an issue by ${creatorName}`,
        type: 'assign-issue'
      }
    )
    return res
      .status(200)
      .send(new Response(200, 'success', await newIssue.save()))
  } catch (err) {
    return res.status(400).send(new Response(400, err.message))
  }
}
