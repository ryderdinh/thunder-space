const jwt = require("jsonwebtoken");
const Staff = require("../../../models/Staff")
const Response = require("../../../models/Response")
 async function authenticateToken(req, res, next) {
   try {
    const authHeader = req.headers["authorization"];
    const token = authHeader.replace('Bearer ', '')
    if (token == null) return res.status(400).send(new Response(400, "login failed"));
    const user = await Staff.findOne({ 'tokens.token' : token })
  if(user){
   const validToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    if(validToken){
      req.user = user
      req.token = token
      next();
    }
  }else{
    return res.status(401).send(new Response(401, "unauthorize"))
  }

} catch (error) {
  return res.status(400).send(new Response(400, "something went wrong"));
  }
}

module.exports = authenticateToken;
