const Project = require('../../../models/Project')
const Staff = require('../../../models/Staff')
const Response = require('../../../models/Response')
const Notification = require('../../../models/Notification')
module.exports = async (req, res, next) => {
  try {
    const userId = req.user._id
    let code = ''
    let seqcode = 0
    const name = req.body.name.trim()
    const description = req.body.description || ''
    const existCreator = await Staff.findById({ _id: userId })

    //Valid name
    if (!(name.length >= 2 && name.length <= 25)) {
      return res.send(400).send(400, 'name is not valid')
    }
    //Auto generate code
    const arrWordOfName = name.split(' ')
    for (let i = 0; i < arrWordOfName.length; i++) {
      code += arrWordOfName[i].charAt(0)
    }
    const existCode = await Project.find({ code: code })
      .sort({ seqcode: 'desc' })
      .limit(1)
    if (existCode[0]) {
      seqcode = existCode[0].seqcode + 1
    }
    //Valide body
    const maybeDuplicate = [...req.body.managers, ...req.body.members]
    const removeDuplicate = [...new Set(maybeDuplicate)]

    if (removeDuplicate.length != maybeDuplicate.length)
      return res.status(400).send(new Response(400, 'wrong data form'))
    if (!removeDuplicate.every((e) => e !== existCreator.email))
      return res.status(400).send(new Response(400, 'wrong data form'))
    //Valid exsit member
    const existManager = await Staff.find({ email: req.body.managers })
    const existMember = await Staff.find({ email: req.body.members })
    //Map value
    const managers = existManager.map(
      (e) =>
        (e = {
          uid: e._id,
          role: 'manager',
          status: 'pending'
        })
    )
    const members = [...existMember].map(
      (e) =>
        (e = {
          uid: e._id,
          role: 'normal',
          status: 'pending'
        })
    )
    const admin = [
      {
        uid: existCreator._id,
        role: 'admin'
      }
    ]
    // Create
    const result = await Project.create({
      code: code,
      name: name,
      description: description,
      member: admin,
      guest: [...managers, ...members],
      seqcode: seqcode
    })
    const membersToInvite = [...managers, ...members]
    const notifications = []
    for (let i = 0; i < membersToInvite.length; i++) {
      notifications.push({
        content: `you have received an invitation to join project '${name}' by ${existCreator.name}`,
        type: 'invitation-project',
        status: 'pending',
        owner: membersToInvite[i].uid,
        data: {
          pid: result._id
        }
      })
    }
    const io = req.app.get('socketio')
    await Notification.create(notifications)
    io.to(membersToInvite.map((e) => (e = e.uid.toString()))).emit(
      'invitation-project',
      {
        content: `you have received an invitation to join project '${name}' by ${existCreator.name}`,
        type: 'invitation-project',
        status: 'pending'
      }
    )
    return res
      .status(200)
      .send(new Response(200, 'success', await result.getProjectDetails()))
  } catch (err) {
    console.log(err)
    res.status(400).send(new Response(400, err.message))
  }
}
