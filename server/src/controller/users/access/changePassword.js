const Staff = require("../../../models/Staff");
const History = require("../../../models/History");
const express = require("express");
const bcrypt = require("bcrypt");

module.exports = async (req, res, next) => {
  try {
    let _id = req.user._id;
    const { newPassword, currentPassword } = req.body;
    const staff = await Staff.findOne({ _id: _id });
    const validNewPassword = await bcrypt.compare(newPassword, staff.password);
    if (validNewPassword === currentPassword) {
      return res.status(400).send({
        status: 400,
        error: "new password is same your current password",
      });
    }
    if (newPassword.length < 6) {
      return res.status(400).send({
        status: 400,
        error: "new password is invalid",
      });
    }
    staff.password = newPassword;
    staff.save();
    return res.status(200).send({
      status: 200,
      data: "success",
    });
  } catch (error) {
    res.status(400).send({
      status: 400,
      error: "something went wrong",
    });
  }
};
