const Event = require("../../../models/Event")
const { toUTCString } = require("../../../utils/toUTCString")
const moment = require("moment")

module.exports = (req, res) => {
  const id = req.query.searchId
  Event.findById(id, (err, event) => {
  event.date = moment(toUTCString(event.date)).format("YYYY-MM-DDThh:mm:ss")
  const data = {
    name : event.name,
    date : event.date,
    position : event.event_detail.position,
    content : event.event_detail.content
  }
    res.render("updateEvent",{ 
      path : "/admin/event-information",
      id : id,
      event : data, 
      title : "Update Event"
     });
  })
};
