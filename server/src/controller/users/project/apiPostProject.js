const Project = require("../../../models/Project");
const Staff = require("../../../models/Staff");
const Response = require("../../../models/Response")
module.exports = async (req, res, next) => {
  try {
    const userId = req.user._id;
    let  code = "";
    let seqcode = 0;
    const name = " " + req.body.name.trim();
    const description = req.body.description || "";
    const existCreater = await Staff.findById({ _id: userId });
    
    //Valid name
    if(!(name.length >= 2 && name.length <=25)){
      return res.send(400).send(400, "name is not valid");
    }
    //Auto generate code
    const arrWordOfName = name.split(" ");
    for(let i = 0; i < arrWordOfName.length; i++){
      code += arrWordOfName[i].charAt(0)
    }
    name.trim()
    const existCode = await Project.find({ name: name }).sort({seqcode : "desc"}).limit(1);
    // console.log(existCode);
    if(existCode[0]){
      seqcode = existCode[0].seqcode + 1
      code+= seqcode
    }
    // if (existCode)
    //   return res.status(400).send(new Response(400, "project code already exist"));
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

// console.log([...managers, ...members]);
    // Create
    const result = await Project.create({
      code: code,
      name: name,
      description : description,
      member: [...managers, ...members],
      seqcode: seqcode
    });
    
    return res.status(200).send(new Response(200, "success", await result.getProjectDetails()));
  } catch (err) {
    console.log(err);
    res.status(400).send(new Response(400, err));
  }
};
