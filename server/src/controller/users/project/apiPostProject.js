const Project = require("../../../models/Project");
const Staff = require("../../../models/Staff");
const Response = require("../../../models/Response")
module.exports = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const code = req.body.code;
    const name = req.body.name;

    const existCreater = await Staff.findById({ _id: userId });
    //Valid code
    const existCode = await Project.findOne({ code: code });
    if (existCode)
      return res.status(400).send(new Response(400, "project code already exist"));
    //Valide body
    const maybeDuplicate = [
      ...req.body.managers,
      ...req.body.members,
    ];
    const removeDuplicate = [...new Set(maybeDuplicate)];

    if (removeDuplicate.length != maybeDuplicate.length)
      return res.status(400).send(new Response(400, "wrong data form"));
    if (!removeDuplicate.every((e) => e !== existCreater.email))
      return res.status(400).send(new Response(400, "wrong data form"));
    //Valid exsit member
    const existManager = await Staff.find({ email: req.body.managers });
    const existMember = await Staff.find({ email: req.body.members });
    //Map value
    const managers = [...existManager, existCreater].map(
      (e) =>
        (e = {
          uid: e._id,
          role: "manager",
          name : e.name,
          avatar : e.avatar.url
        })
    );
    const members = [...existMember].map(
      (e) =>
        (e = {
          uid: e._id,
          role: "normal",
          name : e.name,
          avatar : e.avatar.url
        })
    );

console.log([...managers, ...members]);
    // Create
    const result = await Project.create({
      code: code,
      name: name,
      member: [...managers, ...members],
    });
    result.save();
    return res.status(200).send(new Response(200, "success"));
  } catch (err) {
    res.status(400).send(new Response(400, err));
  }
};
