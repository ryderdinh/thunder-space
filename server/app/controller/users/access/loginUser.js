const Staff = require("../../../models/staffInformation");
const moment = require("moment-timezone")
const { convert } = require("../../../utils/dateFormat")
const History = require("../../../models/history")
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
          Staff.findById(data[0].id
            , (err, staff) => {
                if(staff){
                  History.create({
                    email : staff.email,
                    status : "Login",
                    type : "Account",
                    details : {
                      day : date,
                      time : time
                    }
                  },(err, history) =>{
                   if(!err){
                    return res.json({
                      data: {
                        status: "Login succesfully",
                        id: data[0]._id,
                      },
                    });
                   }
                  })                  
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
