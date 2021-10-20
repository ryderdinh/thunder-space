const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const Staff = require("../../../models/Staff")
module.exports = (req, res, next) => {
        //Authenticate user
        const dataUser = req.query;
        const { username, password } = dataUser;
        Staff.findOne({ email: username }, (error, user) => {
        if (user) {
          // console.log(user);
          var id = user.id
          // console.log(id + "''''''''''''''''");
            bcrypt.compare(password, user.password, (error, same) => {
                if (same) { // if passwords match
                  const userInfo = { name: user.email };
                  const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: "60m",
                  });
                  
                Staff.findByIdAndUpdate(id, { token : accessToken }, (err, staff) => {
                  console.log(err);
                })
                 return res.json({ accessToken: accessToken })
                } else {
                    res.json({data : {status: "Wrong password"}})
                }
            })
        } else {
              res.json({data : {status: "Wrong Email"}})
        }
    })
}