 const env = process.env.NODE_ENV.trim()
 module.exports = (req, res) => {
     res.render("create/createEvent",{
         path1: '/admin/eventInfo',
         path2: '/admin/eventInfo',
         env : env,
         title : "Create Event"
     })
 }