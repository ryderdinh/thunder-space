module.exports = (req, res) => {
  const id = req.query.searchId
  res.render("updateEvent",{ 
    path : "/admin/event-information",
    id : id
   });
};
