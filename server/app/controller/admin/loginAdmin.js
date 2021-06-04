module.exports = (req, res) => {
    console.log(req.body);
    const name = req.body.uname;
    const pass = req.body.psw;

    if(name === "admin" && pass ==="admin") {
        res.redirect("/admin/dashboard")
    }  else {
        res.redirect("/admin/login")
    }
}