
module.exports = (req, res) => {
  id = req.query.searchId
  res.render("updateUser",{
    id : id,
    path : "/admin/user-information"
  });
};
