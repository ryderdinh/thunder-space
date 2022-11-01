const Staff = require("../../../models/Staff");
const History = require("../../../models/History");
const express = require("express");
const bcrypt = require("bcrypt");
const Response = require("../../../models/Response")
module.exports = async (req, res, next) => {
  try {
    let _id = req.user._id;
    const { newPassword, currentPassword } = req.body;
    const staff = await Staff.findOne({ _id: _id });
    const validCurrentPassword = await bcrypt.compare(currentPassword, staff.password);
    if(!validCurrentPassword) {
      return res.status(400).send(new Response(400, "current password is incorrect"))
    }
    // if (newPassword === currentPassword) {
    //   return res.status(400).send(new Response(400, "new password is same your current password"));
    // }
    // if (newPassword.length < 6) {
    //   return res.status(400).send(new Response(400, "new password is invalid"));
    // }
    staff.password = newPassword;
    staff.tokens = [];
    staff.save();
    return res.status(200).send(new Response(200, "success"));
  } catch (error) {
    res.status(400).send(new Response(400, "something went wrong"));
  }
};
