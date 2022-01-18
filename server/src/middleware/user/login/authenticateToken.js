const jwt = require("jsonwebtoken");
const Staff = require("../../../models/Staff")

 async function authenticateToken(req, res, next) {
   try {
    const authHeader = req.headers["authorization"];
    const token = authHeader.replace('Bearer ', '')
    if (token == null) return res.send({ status: "login failed" });
    const user = await Staff.findOne({ 'tokens.token' : token })
  if(user){
   const validToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    if(validToken){
      req.user = user
      req.token = token
      next();
    }
  }else{
    return res.status(400).send({ status : 'login failed' })
  }

} catch (error) {
  return res.send({ status: "login failed" });
  }
}

module.exports = authenticateToken;
