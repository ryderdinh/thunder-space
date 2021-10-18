const Status = require("../../../models/status")
const History = require("../../../models/history")
const { distance } = require("../../../utils/findDistance")
const { changeTimeToFloat } = require("../../../utils/handleTime")
const router = require('express').Router()
const authenticateToken = require("../../../../middleware/user/login/authenticateToken")
const moment = require("moment")

router.put("/location/:id",  async  (req, res, next) => {
       try {
        const sId = req.params.id;
        const existStatus = await Status.findById(sId)
        const lat = Number(req.query.lat)
        const lon = Number( req.query.lon)
        const currentDistance = Math.round(
          distance(lat, lon, 20.963528714717416, 105.81668138811938)
        );
        
        if(existStatus && currentDistance){
            const currentTime = Date.now()
            if(!existStatus.timeStart && !existStatus.timeEnd){
                existStatus.timeStart = currentTime
                existStatus.timeLine.push([currentTime, currentDistance])
                existStatus.save()
                return res.json({
                    status : "Check in complete !"
                })
            }
            if(existStatus.timeStart && !existStatus.timeEnd){
                let limitCheckIn = currentTime - existStatus.timeStart
               if(limitCheckIn > 300000){
                existStatus.timeEnd = currentTime
                existStatus.timeLine.push([currentTime, currentDistance])
                existStatus.save()
                return res.json({
                    status : "Check in complete !"
                })
               }else{
                   return res.json({
                       status : "Try after 5 minutes !"
                   })
               }
            }
            if(existStatus.timeStart && existStatus.timeEnd){
                let limitCheckIn = currentTime - existStatus.timeEnd
               if(limitCheckIn > 300000){
                existStatus.timeEnd = currentTime
                existStatus.timeLine.push([currentTime, currentDistance])
                existStatus.save()
                return res.json({
                    status : "Check in complete !"
                })
               }else{
                   return res.json({
                       status : "Try after 5 minutes !"
                   })
               }
            }
        }
        return res.json("Can not check in !")
       } catch (error) {
           return res.json({
               status : 'Some thing went wrong !'
           })
       }
})

module.exports = router;

