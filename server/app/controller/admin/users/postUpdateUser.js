const { model } = require("mongoose");
const Staff = require("../../../models/Staff");
const bcrypt = require("bcrypt");
const { convert } = require("../../../utils/dateFormat");
const express = require("express")
const router = express.Router()
const { authSchema } = require("../../../../middleware/admin/form/checkFormRegister")
// var popupS = require('popups');
router.post("/editUser/:id", (req, res) => {
  let id = req.params.id
  Staff.findById(id, (error, staff) => {
    if (error) {
      return res.redirect("/createMember");
    }
    // convert type of birthday
    // newBirthday =
    //   newBirthday.toString() || staffInformation.birthday.toString();
    // let arrayBirthday = newBirthday.split("-");
    // newBirthday = "";
    // for (let i = 0; i < arrayBirthday.length; i++) {
    //   if (arrayBirthday.length - i - 1 !== 0) {
    //     newBirthday += arrayBirthday[arrayBirthday.length - i - 1] + "-";
    //   } else {
    //     newBirthday += arrayBirthday[arrayBirthday.length - i - 1];
    //   }
    // }
    // console.log("success");
    // get input information
    let newBirthday = req.body.newBirthday;
    // let convertDate = convert(staffInformation.birthday)

    // updateBirthday = newBirthday.length == 10 ? newBirthday : convertDate
    // console.log(updateBirthday);
    let newEmail = req.body.newEmail.trim();
    updateEmail = newEmail.length > 0 ? newEmail : staff.email
    let newPassword = req.body.newPassword.trim();
    updatePassword = newPassword.length >= 6 ? bcrypt.hashSync(newPassword, 10) : staff.password;
    // newPassword = bcrypt.hashSync(newPassword, 10);
    // console.log(newPassword);
    let newName = req.body.newName.trim();
    updateName = newName !== "" ? newName : staff.name
    let newPosition = req.body.newPosition.trim();
    updatePosition = newPosition !== "" ? newPosition : staff.position
    let newDepartment = req.body.newDepartment.trim();
    updateDepartment = newDepartment !== "" ? newDepartment : staff.department
    let newPhonenumber = req.body.newPhonenumber.trim();
    updatePhonenumber = newPhonenumber !== "" ? newPhonenumber : staff.phonenumber
    var result = {}
    if (newBirthday.length == 10) {
      result = {
        email: updateEmail,
        password: updatePassword,
        name: updateName,
        birthday: newBirthday,
        position: updatePosition,
        department: updateDepartment,
        phonenumber: updatePhonenumber
      }
    } else {
      result = {
        email: updateEmail,
        password: updatePassword,
        name: updateName,
        position: updatePosition,
        department: updateDepartment,
        phonenumber: updatePhonenumber,
      }
    }

    Staff.findByIdAndUpdate(
      id,
      result,
      { new: true },
      (err, staffInfo) => {
        if (err) {
          // console.log("error");
          res.render("updateUser");
        }
        // console.log(staffInfo);
        // console.log("updated");
        return res.redirect("/admin/userInfo");
      }
    );
  });
});

module.exports = router
