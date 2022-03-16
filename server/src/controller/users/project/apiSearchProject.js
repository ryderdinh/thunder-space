const router = require("express").Router();
const Project = require("../../../models/Project");

module.exports = async (req, res, next) => {
  try {
    const uid = req.user.id;
    const code = req.query.pid;
    const existProject = await Project.find({
      code: code,
      member: { $elemMatch: { uid: uid } },
    });
    if (!existProject || existProject.length == 0) {
      return res.status(404).send({
        status: 404,
        error: "project does not exist",
      });
    } else {
      for (let i = 0; i < existProject.length; i++) {
        existProject[i] = {
          projectId: existProject[i].pid,
          projectCode: existProject[i].code,
          projectName: existProject[i].name,
          projectIssue: existProject[i].issue,
        };
      }
      // console.log(existProject);
      return res.json(existProject);
    }
  } catch (err) {
    res.status(400).send({
      status: 400,
      error: "something went wrong",
    });
  }
};

module.exports = router;
