// const { model } = require("mongoose");
// const Event = require("../models/event");
// const { convert } = require('../utils/dateFormat')
// const bcrypt = require("bcrypt");
// // var popupS = require('popups');

// module.exports = (req, res) => {
//   let id = req.body.id;
//   Event.findById(id, (error, event) => {
//     if (error) {
//       return res.redirect("/createMember");
//     }
//     // convert type of date
//     // let newDate = req.body.newDate.toString();
//     // newDate = newDate.toString();
//     // let arrayDate = newDate.split("-");
//     // newDate = "";
//     // for (let i = 0; i < arrayDate.length; i++) {
//     //   if (arrayDate.length - i - 1 !== 0) {
//     //     newDate += arrayDate[arrayDate.length - i - 1] + "-";
//     //   } else {
//     //     newDate += arrayDate[arrayDate.length - i - 1];
//     //   }
//     // }
//     // newDate = convert(newDate)
//     // console.log("success");
    
//     // get input information
//     let newDate = req.body.newDate
//     let newName = req.body.newName;
//     let newPosition = req.body.newPosition;

//     // validate input information
//     switch (newName) {
//       case "":
//         newName = event.name;
//         break;
//       case null:
//         newName = event.name;
//         break;
//     }
//     switch (newDate) {
//       case "":
//         newDate = event.date;
//         break;
//       case null:
//         newDate = event.date;
//         break;
//     }
//     switch (newPosition) {
//       case "":
//         newPosition = event.position;
//         break;
//       case null:
//         newPosition = event.position;
//         break;
//     }
//     Event.findByIdAndUpdate(
//       id,
//       {
//         name: newName,
//         date: newDate,
//         position: newPosition,
//       },
//       { new: true },
//       (err, event) => {
//         if (err) {
//          return  res.render("updateEvent");
//         }
//         return res.redirect("/admin/event-information");
//       }
//     );
//   });
// };
