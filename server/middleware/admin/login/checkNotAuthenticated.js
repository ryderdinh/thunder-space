function checkNotAuthenticated (req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect("/admin/dashboard")
    }
    next()
}

module.exports = checkNotAuthenticated