const History = require("../../../models/History");
const TimeSheet = require("../../../models/TimeSheet")
const { distance } = require("../../../utils/findDistance");
const Response = require("../../../models/Response")
module.exports = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { lat, lon } = req.body;
    const currentDistance = Math.round(
      distance(lat, lon, 20.963528714717416, 105.81668138811938)
    );
    const year = (new Date().getFullYear()).toString();
    const month = (new Date().getMonth() + 1).toString();
    const date = (new Date().getDate()).toString();
    const dataCheckIn = {
      time: Date.now(),
      distance: currentDistance
    }
    const existTimeSheet = await TimeSheet.findOne({ owner: userId });
    if (!existTimeSheet) {
      const newTimeSheet = new TimeSheet({ owner: userId, timeline: {} })
      newTimeSheet.timeline[year] = {
        [month]: {
          [date]: [dataCheckIn]
        }
      }
      await newTimeSheet.save();
      return res.status(200).send(new Response(200, "check in complete"));
    }
    if (!((existTimeSheet.timeline).hasOwnProperty(year))) {
      existTimeSheet.timeline[year] = {
        [month]: {
          [date]: []
        }
      }
    }
    if (!((existTimeSheet.timeline[year]).hasOwnProperty(month))) {
      existTimeSheet.timeline[year][month] = {
          [date]: []
      }
    }
    const lengthChekIn = existTimeSheet.timeline[year][month][date].length;
    if (lengthChekIn > 1) {
      const limitCheckIn = Date.now() - existTimeSheet.timeline[year][month][date][lengthChekIn - 1].time
      if (limitCheckIn < 300000) {
        return res.status(400).send(new Response(400, "try after 5 minutes"));
      }
    }
    (existTimeSheet.timeline[year][month][date]).push(dataCheckIn);
    existTimeSheet.markModified('timeline');
    await existTimeSheet.save();
    return res.status(200).send(new Response(200, "check in complete"));
  } catch (err) {
    if (err)
    return res.status(400).send(new Response(400, err.message));
  }
};
