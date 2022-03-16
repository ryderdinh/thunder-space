const Staff = require("../../../models/Staff");
const convertDate = require("../../../utils/convertDate");
const express = require("express");
const router = express.Router();
const { convert } = require("../../../utils/dateFormat");

module.exports = async (req, res) => {
  try {
    const userId = req.user.id;
    const staff = await Staff.findById(userId);
    if (staff) {
      return await res.status(200).send({
        status: 200,
        data: staff.getProfile(),
      });
    } else {
      return res.status(401).send({
        status: 401,
        error: "unauthorized",
      });
    }
  } catch (error) {
    res.status(400).send({
      status: 400,
      error: "something went wrong",
    });
  }
};
