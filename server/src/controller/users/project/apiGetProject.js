const Staff = require("../../../models/Staff");
const Project = require("../../../models/Project");

module.exports = async (req, res, next) => {
  try {
    const user = await Staff.findById(req.user._id);
    if (!user)
      return res.status(401).send({
        status: 401,
        error: "unauthorized",
      });
    const projects = (await user.populate("projects")).projects;

    let data = [];
    for (let i = 0; i < projects.length; i++) {
      const members = (await projects[i].populate("members")).members;
      data.push(await projects[i].getDetails(members));
    }
    return res.status(200).send({
      status: 200,
      data: data,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      status: 400,
      error: "something went wrong",
    });
  }
};
