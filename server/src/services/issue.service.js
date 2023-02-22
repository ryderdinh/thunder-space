const Issue = require('../models/Issue')

const changeStatus = async function (iid, uid, status) {
  let query
  let isAssignee = true
  let room
  const forCreator = ['pending', 'close']
  if (forCreator.includes(status)) {
    isAssignee = false
    query =
      status === 'pending'
        ? {
            _id: iid,
            creator: uid,
            status: 'reject'
          }
        : {
            _id: iid,
            creator: uid,
            status: { $ne: status }
          }
  } else {
    query = {
      _id: iid,
      assign: uid,
      status: { $ne: status }
    }
  }
  const update = {
    status,
    $push: {
      history: {
        user: [{ uid }],
        time: Date.now(),
        action: `change status to "${status}"`
      }
    }
  }
  const issue = await Issue.findOneAndUpdate(query, update)
  if (!issue) return false
  const result = {
    room: isAssignee ? issue.creator.toString() : issue.assign.toString(),
    message: {
      content: `issue status has been changed to ${status}`,
      type: 'change-status-issue'
    }
  }
  return result
}

module.exports = {
  changeStatus
}
