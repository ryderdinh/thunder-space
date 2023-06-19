const Project = require('../models/Project')

const getOneProjectByIssue = async function (
  uid,
  { project, _id },
  select,
  lean
) {
  try {
    const existProject = lean
      ? await Project.findOne({
          $and: [
            { _id: project },
            { deleted: false },
            { member: { $elemMatch: { uid } } },
            { issue: { $elemMatch: { iid: _id } } }
          ]
        })
          .select(select)
          .lean()
      : await Project.findOne({
          $and: [
            { _id: project },
            { deleted: false },
            { member: { $elemMatch: { uid } } },
            { issue: { $elemMatch: { iid: _id } } }
          ]
        })
              .select(select)
    return existProject
  } catch (err) {
    return err
  }
}

module.exports = {
  getOneProjectByIssue
}
