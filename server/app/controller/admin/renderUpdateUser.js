
const Staff = require('../../models/staffInformation')
const { convert } = require("../../utils/dateFormat")
const moment = require("moment")
module.exports = (req, res) => {
  id = req.query.searchId
  Staff.findById(id, (err, staff) => {
    staff.birthday = moment(staff.birthday).format("YYYY-MM-DD")
    
    res.render("updateUser",{
      id : id,
      path : "/admin/user-information",
      info : staff
    });
  })
};
