const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Staff = require("../../../models/Staff");
const Response = require("../../../models/Response")
module.exports = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Staff.findOne({ email: email });
    if (user) {
      const token = await user.generateToken(password);
      if(!token) return res.status(400).send(new Response(400, "wrong email or password"))
      await Staff.findOneAndUpdate(
        { email: email },
        { $push: { tokens: { token: token } } },
        { new: true }
      );
      return res.status(200).send(new Response(200, "success", { accessToken: token }));
    }
    return res.status(401).send({
      status: 401,
      error: "wrong email or password",
    });
  } catch (error) {
    res.status(400).send({
      status : 400,
      error : "something went wrong"
    })
  }
};
