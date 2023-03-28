const History = require('../models/History')
const { ObjectId } = require('mongoose').Types
const getInIssue = async function (iid, skip) {
  try {
    // const numsOfHistory = await History.countDocuments({ iid })
    const history = await History.aggregate([
      {
        $match: {
          iid: new ObjectId(`${iid}`)
        }
      },
      {
        $unwind: {
          path: '$users',
          includeArrayIndex: 'idx'
        }
      },
      {
        $lookup: {
          from: 'staffs',
          localField: 'users.uid',
          foreignField: '_id',
          as: 'users'
        }
      },
      {
        $unwind: {
          path: '$users'
        }
      },
      {
        $project: {
          users: {
            _id: 1,
            name: 1,
            'avatar.url': 1
          },
          action: 1,
          createdAt: 1,
          updatedAt: 1
        }
      },
      {
        $group: {
          _id: '$_id',
          action: {
            $first: '$action'
          },
          createdAt: {
            $first: '$createdAt'
          },
          updatedAt: {
            $first: '$updatedAt'
          },
          users: {
            $push: '$users'
          }
        }
      },
      {
        $project: {
          users: 1,
          action: 1,
          type: 1,
          createdAt: 1,
          updatedAt: 1
        }
      },
      {
        $sort: {
          _id: -1
        }
      } /*, {
      '$skip': 0
    }, {
      '$limit': 20
    }*/
    ])
    if (!history.length)
      return {
        history: []
      }
    return {
      history
      // numsOfHistory
    }
  } catch (err) {
    return err
  }
}

const createForIssue = async function (iid, users, action, type) {
  try {
    const data = users.map(
      (e, idx) =>
        (e = {
          users: e,
          action: action[idx],
          type,
          iid
        })
    )
    await History.create(data)
    return data
  } catch (err) {
    return err
  }
}
module.exports = {
  getInIssue,
  createForIssue
}
