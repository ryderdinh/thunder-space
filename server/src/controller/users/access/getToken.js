const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const Staff = require("../../../models/Staff")
module.exports = async (req, res, next) => {
       try {
        const { email, password } = req.body;
        const user = await Staff.findOne({email : email})
         if(user){
           const token = await  user.generateToken(password)
           await Staff.findOneAndUpdate({ email : email }, { $push : {tokens : { token : token } } }, {new : true})
           return res.status(200).send({ accessToken : token })
          }
          return res.status(401).send("failure")
        } catch (error) {
           return res.status(400).send("some thing went wrong")
       }

}