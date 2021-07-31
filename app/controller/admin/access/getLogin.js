
const router = require("express").Router()
const checkNotAuthenticated = require("../../../../middleware/admin/login/checkNotAuthenticated")
router.get("/", checkNotAuthenticated, (req, res, next) => {
  res.render("hrm/login/loginAdmin", {
    title: "Login",
  });
})

module.exports = router
