const StaffInformation = require("../../../models/Staff");
const Status = require("../../../models/status");
const TimeSheet = require("../../../models/TimeSheet");
const Report = require("../../../models/report");
const {
  authSchema,
} = require("../../../../middleware/admin/form/checkFormRegister");
const { convert } = require("../../../utils/dateFormat");
const checkAuthenticated = require("../../../../middleware/admin/login/checkAuthenticated");
const express = require("express");
const router = express.Router();
//const transporter = require("../../../../config/sendGrid/confirmEmail");
const { v4: uuidv4 } = require("uuid");

router.post("/storeUser", checkAuthenticated, async (req, res, next) => {
  try {
   
    const result = await authSchema.validateAsync(req.body);
    //Check email exist
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
      //const sendMail = await transporter.sendMail({
        //to: saveStaff.email,
        //from: "boypham1234567@gmail.com",
        //subject: "CONFIRM EMAIL",
        //html: `
          //         <h5>You need to confirm email to access HRM</h5>
            //       <p>This is your password : "123456", please change this when you login in HRM</p>
             //      <a href="http://localhost:3000/api/confirmEmai?email=${saveStaff.email}">CLick this link  to login</a>
               //`,
      //});

      //console.log(statusCre, tableCre, reportCre, sendMail);
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
