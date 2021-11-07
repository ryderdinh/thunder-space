const jwt = require("jsonwebtoken");
const Staff = require("../../../app/models/Staff")

function authenticateToken(req, res, next) {
  // console.log(req.headers);
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];
  // console.log(token);
  if (token == null) return res.json({ data: { status: "Login failed" } });
  Staff.findOne({ token : token }, (err, staff) => {
    // console.log(staff);
    if(staff){
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.json({ data: { status: "Login failed" } });
        req.user = user;
        next();
      });
    }else{
      return res.json({ data: { status: "Login failed" } });
    }
  })
 
}

module.exports = authenticateToken;
