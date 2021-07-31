const Report = require("../../../models/report")
const express  = require('express')
const router = express.Router()
const checkAuthenticated = require("../../../../middleware/admin/login/checkAuthenticated")
const env = process.env.NODE_ENV.trim()
router.get("/reportInfo", checkAuthenticated, (req, res, next) => {
  Report.find({}, (err, reports) => {
    var mapRp = []
    reports.forEach(report => {
      for (let i = 0; i < report.reportDetails.length; i++) {
        mapRp.push({
          id : report.id,
          userName : report.userName,
          content :  report.reportDetails[i].content,
          dateStart :  report.reportDetails[i].date.dateStart,
          dateEnd :  report.reportDetails[i].date.dateEnd,
          type : report.reportDetails[i].typeReport
        })
      }
    })
    
    res.render("hrm/reports/reportInfo",{
      path1 : "/admin/reportInfo",
      path2 : "/admin/reportInfo",
      env : env,
      reports : mapRp,
      title :"Report Info"
    })
  })
});

module.exports = router
