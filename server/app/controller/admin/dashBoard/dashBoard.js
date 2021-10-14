const Staff = require("../../../models/staffInformation");
const History = require("../../../models/history");
if(process.env.NODE_ENV != 'production'){
  require('dotenv').config()
}
const env = process.env.NODE_ENV.trim();
const checkAuthenticated = require("../../../../middleware/admin/login/checkAuthenticated")
const router = require("express").Router()

router.get("/dashboard", checkAuthenticated, (req, res, next) => {
  const countHistory = History.countDocuments();
  Staff.countDocuments((err, count) => {
    countHistory.then((data) => {
      if (data < 5) {
        History.find({}).then((histories) => {
          res.render("hrm/dashboards/dashboard", {
            totalUsers: count,
            histories: histories,
            path1: "/admin/dashboard",
            path2: "/admin/dashboard",
            env: env,
            title: "Dashboard",
          });
        });
      } else {
        var total = data;
        History.find({})
          .skip(total - 5)
          .then((histories) => {
            res.render("hrm/dashboards/dashboard", {
              totalUsers: count,
              histories: histories,
              path1: "/admin/dashboard",
              path2: "/admin/dashboard",
              env: env,
              title: "Dashboard",
            });
          });
      }
    });
  });
})

module.exports = router
