const StaffInformation = require("../../../models/Staff");
const Status = require("../../../models/status");
const TimeSheet = require("../../../models/TimeSheet");
const Report = require("../../../models/Report");
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

      //Create  new status

      const statusCre = await Status.create(
        {
          _id: saveStaff._id,
          timeLocation: [],
        },
        (err, status) => {
          console.log(err, status);
        }
      );

      //Create new table
      const tableCre = await TimeSheet.create(
        {
          _id: saveStaff._id,
        },
        (err, table) => {
          console.log(err, table);
        }
      );
      //Create report
      const reportCre = await Report.create(
        {
          _id: saveStaff._id,
          userName: saveStaff.name,
        },
        (err, report) => {
          console.log(err, report);
        }
      );


      // console.log(statusCre, tableCre, reportCre, sendMail);
      req.flash("createUserSuccess", " Create successfully");
      res.redirect("/admin/createUser");
    }
  } catch (err) {
    console.log(err);
    if (err.isJoi === true || err) {
      req.flash("createUserFailed", `${err}`);
      res.redirect("/admin/createUser");
    }
    next();
  }
});

module.exports = router;
