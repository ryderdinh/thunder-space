const StaffInformation = require("../../../models/Staff");
const {
  authSchema,
} = require("../../../middleware/admin/form/checkFormRegister");
const checkAuthenticated = require("../../../middleware/admin/login/checkAuthenticated");
const express = require("express");
const router = express.Router();

router.post("/storeUser", checkAuthenticated, async (req, res, next) => {
  try {
   
    const result = await authSchema.validateAsync(req.body);
    const emailExist = await StaffInformation.findOne({
      email: req.body.email,
    });
    if (emailExist) {
      req.flash("createUserFailed", "Email hasbeen created");
      res.redirect("/admin/createUser");
    } else {
      // Create new user
      const newStaff = new StaffInformation(result);
      const saveStaff = await newStaff.save();
      // console.log(statusCre, tableCre, reportCre, sendMail);
      req.flash("createUserSuccess", " Create successfully");
      res.redirect("/admin/createUser");
    }
  } catch (err) {
    if (err.isJoi === true || err) {
      req.flash("createUserFailed", `${err}`);
      res.redirect("/admin/createUser");
    }
    next();
  }
});

module.exports = router;
