const History = require('../models/History')
const { ObjectId } = require('mongoose').Types
const getInIssue = async function (iid, skip) {
  const numsOfHistory = await History.countDocuments({ iid })
  console.log(iid)
  const history = await History.aggregate([
    {
      $match: {
        iid: new ObjectId(`${iid}`)
      }
    },
    {
      $lookup: {
        from: 'staffs',
        localField: 'user.uid',
        foreignField: '_id',
        as: 'uData'
      }
    },
    {
      $project: {
        uData: {
          name: 1,
          'avatar.url': 1,
          _id: 1
        },
        action: 1,
        type: 1,
        createdAt: 1,
        updatedAt: 1
      }
    },
    {
      $sort: {
        createdAt: 1
      }
    },
    {
      $skip: +skip
    },
    {
      $limit: 20
    }
  ])
  if (!history.length) return false
  return {
    history,
    numsOfHistory
  }
}

module.exports = {
  getInIssue
}
