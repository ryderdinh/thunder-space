const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Staff = require("../../../models/Staff");
module.exports = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await Staff.findOne({ email: email });
    if (user) {
      const token = await user.generateToken(password);
      if(!token) return res.status(401).send({
        status : 401,
        error : "wrong email or password"
      })
      await Staff.findOneAndUpdate(
        { email: email },
        { $push: { tokens: { token: token } } },
        { new: true }
      );
      return res.status(200).send({
        status: 200,
        accessToken: token,
      });
    }
    return res.status(401).send({
      status: 401,
      error: "wrong email or password",
    });
  } catch (error) {
   console.log(error);
    res.status(400).send({
      status : 400,
      error : "something went wrong"
    })
  }
};
