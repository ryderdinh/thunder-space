 const env = process.env.NODE_ENV.trim()
 const Event = require("../../../models/event")
 module.exports = (req, res) => {
     Event.find({}, (err, event) => {
     for(let i=0 ; i< event.length; i++){
         event[i] = {
            id : event[i].id,
            title : event[i].name,
            start : event[i].date,
            allDay : true,
            className : event[i].tag,
            description : event[i].event_detail.content,
            position : event[i].event_detail.position,
         }
     }
    //  console.log(event);
            eventInfo = JSON.stringify(event)
         if(!err) 
         res.render("hrm/events/createEvent",{
            path1: '/admin/eventInfo',
            path2: '/admin/eventInfo',
            env : env,
            title : "Create Event",
            eventInfo : eventInfo
        })
     })
 }
