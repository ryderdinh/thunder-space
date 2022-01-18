const Staff = require("../../../models/Staff")

module.exports =  async (req, res, next) => {
    try{
    const  email = req.query.email
    const user = await Staff.findOne({ email : email })
    if(user){
        return res.status(200).send(user.getProfile())
    }
    return res.status(404).send("not found")
    }catch(err){
       return res.status(400).send("some thing went wrong")
    }
}
