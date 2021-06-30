const Staff = require("../models/staffInformation");
const moment = require("moment-timezone")
const { convert } = require("../utils/dateFormat")
module.exports = (req, res) => {
  var time = moment.tz("Asia/Ho_Chi_Minh").format("hh:mm:ss")
  var date = convert(Date.now())
  if(req.user.name == null){
    return res.json( { data : {
      status : "Login failed"
    } })
  }else{
    Staff.find(
      {
        email: req.user.name,
      },
      (err, data) => {
        if (data.length !=0) {
          Staff.findByIdAndUpdate(data[0].id,
            { $push : { activity_log: {
              uid : data[0].id,
              status : `Sign in at ${time} in ${date}`
            }} }
            , (err, staff) => {
                if(staff){
                  console.log(staff);
                  return res.json({
                    data: {
                      status: "Login succesfully",
                      id: data[0]._id,
                    },
                  });
                }
          })
        }
        // return res.json( { data : {
        //   status : "Login failed"
        // } })
      }
    );
  }
  
};
