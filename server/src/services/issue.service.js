const History = require('../models/History')
const Issue = require('../models/Issue')

const changeStatus = async function (iid, uid, status) {
  let query
  let mustNoti = true
  const forCreator = ['pending', 'close']
  if (forCreator.includes(status)) {
    isAssignee = false
    query =
      status === 'pending'
        ? {
            _id: iid,
            creator: uid,
            status: { $in: ['reject', 'done', 'close'] }
          }
        : {
            _id: iid,
            creator: uid,
            status: { $ne: status }
          }
  } else {
    if (['started', 'reject'].includes(status)) {
      query = {
        _id: iid,
        assign: uid,
        status: 'pending'
      }
    }
    if (status === 'done') {
      query = {
        _id: iid,
        assign: uid,
        status: 'started'
      }
    }
  }
  const update = {
    status
    // $push: {
    //   history: {
    //     user: [{ uid }],
    //     time: Date.now(),
    //     action: `change status to "${status}"`
    //   }
    // }
  }
  const issue = await Issue.findOneAndUpdate(query, update)
  if (!issue) {
    return false
  }
  if (issue.assign.toString() === issue.creator.toString()) {
    mustNoti = false
  }
  await History.create({
    user: [{ uid }],
    action: `Change status issue to ${status}`,
    type: 'issue',
    iid: issue._id
  })
  const result = {
    room: uid,
    notification: {
      content: `issue status has been changed to ${status}`,
      type: 'change-status-issue',
      data: {
        iid: issue._id
      },
      owner: uid
    },
    mustNoti
  }
  return result
}

const userInIssue = async function (iid, uid) {
  const issue = await Issue.findOne({
    _id: iid,
    $or: [{ assign: uid }, { creator: uid }]
  })
    .select('_id')
    .lean()
  if (!issue) return false
  return true
}

module.exports = {
  changeStatus,
  userInIssue
}
