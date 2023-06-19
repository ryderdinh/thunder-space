const History = require('../models/History')
const Issue = require('../models/Issue')
const service = require('../services/index')
const { ObjectId } = require('mongoose').Types

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

const createIssue = async function ({
  assign,
  uid,
  pid,
  code,
  name,
  type,
  estimate,
  priority,
  description = '',
  status = 'pending'
}) {
  try {
    const newIssue = new Issue({
      name,
      code,
      type,
      creator: uid,
      assign,
      estimate: {
        start: Date.now(),
        end: estimate
      },
      description,
      priority,
      project: pid,
      status
    })
    const err = newIssue.validateSync()
    await newIssue.save()
    if (err) return err
    return newIssue
  } catch (err) {
    return err
  }
}

const getDetailsIssueById = async function (iid) {
  try {
    const issue = await Issue.aggregate([
      {
        $match: {
          _id: new ObjectId(`${iid}`)
        }
      },
      {
        $lookup: {
          from: 'staffs',
          localField: 'creator',
          foreignField: '_id',
          as: 'creator'
        }
      },
      {
        $lookup: {
          from: 'staffs',
          localField: 'assign',
          foreignField: '_id',
          as: 'assign'
        }
      },
      {
        $unwind: {
          path: '$creator'
        }
      },
      {
        $unwind: {
          path: '$assign'
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          code: 1,
          type: 1,
          project: 1,
          creator: {
            name: 1,
            'avatar.url': 1,
            email:1,
            _id: 1
          },
          assign: {
            name: 1,
            'avatar.url': 1,
            email:1,
            _id: 1
          },
          estimate: 1,
          description: 1,
          priority: 1,
          attachment: 1,
          status: 1,
          createdAt: 1,
          updatedAt: 1
        }
      }
    ])
    const { history } = await service.history.getInIssue(iid)
    return { ...issue[0], history }
  } catch (err) {
    console.log(err)
    return err
  }
}
module.exports = {
  changeStatus,
  userInIssue,
  createIssue,
  getDetailsIssueById
}
