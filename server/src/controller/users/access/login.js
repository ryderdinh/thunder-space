const Staff = require("../../../models/Staff");
module.exports  = async (req, res, next) => {
  try {
    const id = req.user._id.toString()
    const user = await Staff.findOne({ _id : id})
    if(user){
      const profile = await user.getProfile()
      return res.status(200).send({ data : profile } )
    }
    return res.status(401).send("unauthorize")
  } catch (error) {
    return res.status(400).send("some thing went wrong") 
  }
};
