const Status = require("../../../models/status")
const History = require("../../../models/history")
const { distance } = require("../../../utils/findDistance")

module.exports = async (req, res, next) => {
       try {
        const userId = req.user.id;
        const existStatus = await Status.findById(userId)
        const {lat, lon} = req.body
        const currentDistance = Math.round(
          distance(lat, lon, 20.963528714717416, 105.81668138811938)
        );
        
        if(existStatus && currentDistance){
            const currentTime = Date.now()
            if(!existStatus.timeStart && !existStatus.timeEnd){
                existStatus.timeStart = currentTime
                existStatus.timeLine.push([currentTime, currentDistance])
                existStatus.save()
                    return res.status(200).send({data : "check in complete"})
            }
            if(existStatus.timeStart && !existStatus.timeEnd){
                let limitCheckIn = currentTime - existStatus.timeStart
               if(limitCheckIn > 300000){
                existStatus.timeEnd = currentTime
                existStatus.timeLine.push([currentTime, currentDistance])
                existStatus.save()
                    return res.status(200).send({data : "check in complete"})
               }else{
                    return res.status(200).send({data : "try after 5 minutes"})
               }
            }
            if(existStatus.timeStart && existStatus.timeEnd){
                let limitCheckIn = currentTime - existStatus.timeEnd
               if(limitCheckIn > 300000){
                existStatus.timeEnd = currentTime
                existStatus.timeLine.push([currentTime, currentDistance])
                existStatus.save()
                    return res.status(200).send({data : "try after 5 minutes"})
               }else{
                   return res.status(200).send({data : "try after 5 minutes"})
               }
            }
        }
          return res.status(400).send("can not check in")
       } catch (error) {
        return res.status(400).send("can not check in")
        }
}



