const Task = require('../models/Task')
const Staff = require('../models/Staff')
const { ObjectId } = require('mongoose').Types
const createTask = async function (uid, data) {
  try {
    const newTask = await Task.create(data)
    await Staff.findOneAndUpdate(
      { _id: uid },
      { $push: { tasks: { tid: newTask._id } } }
    )
    return newTask
  } catch (err) {
    return err
  }
}

const getTasks = async function (uid, skip) {
  try {
    const data = await Staff.aggregate([
      {
        $match: {
          _id: new ObjectId(`${uid}`)
        }
      },
      {
        $project: {
          tasks: 1,
          _id: 0,
          numTask: {
            $size: '$tasks'
          }
        }
      },
      {
        $unwind: {
          path: '$tasks',
          includeArrayIndex: 'index'
        }
      },
      {
        $project: {
          tid: '$tasks.tid',
          numTask: 1
        }
      },
      {
        $lookup: {
          from: 'tasks',
          localField: 'tid',
          foreignField: '_id',
          as: 'tasks'
        }
      },
      {
        $unwind: {
          path: '$tasks'
        }
      },
      {
        $project: {
          _id: '$tasks._id',
          title: '$tasks.title',
          status: '$tasks.status',
          pin: '$tasks.pin',
          description: '$tasks.description',
          createdAt: '$tasks.createdAt',
          updatedAt: '$tasks.updatedAt',
          numTask: 1
        }
      },
      {
        $skip: +skip || 0
      },
      {
        $limit: 10
      }
    ])
    return data
  } catch (err) {
    if (err.code === 17124) {
      return []
    }
    return err
  }
}

const updateTask = async function (tid, data) {
  try {
    const result = await Task.findByIdAndUpdate(
      tid,
      { $set: data },
      { new: true }
    )
    return result
  } catch (err) {
    return err
  }
}
const changeIndex = async function (uid, data) {
  try {
    const result = await Staff.findByIdAndUpdate(uid, { tasks: data })
    return result
  } catch (err) {
    return err
  }
}

const deleteTasks = async function (uid, data) {
  try {
    const result = await Staff.updateOne(
      {
        $and: [
          { _id: uid },
          {
            'tasks.tid': {
              $all: data
            }
          }
        ]
      },
      {
        $pull: {
          tasks: { tid: { $in: data } }
        }
      }
    )
    if (result.modifiedCount === 0) return false
    return result
  } catch (err) {
    return err
  }
}

module.exports = {
  createTask,
  getTasks,
  updateTask,
  changeIndex,
  deleteTasks
}
