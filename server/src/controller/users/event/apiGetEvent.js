const { env } = require("shelljs");
const Event = require("../../../models/Event");
const { convert } = require("../../../utils/dateFormat");

module.exports = (req, res) => {
  Event.find({}, (err, event) => {
    if (err) {
      res.status(400).send({
        status: 400,
        error: "something went wrong",
      });
    }
    event = event.map(
      (e) =>
        (e = {
          eid: e._id,
          name: e.name,
          date: convert(e.date),
          event_detail: e.event_detail,
        })
    );
    res.status(200).send({
      status: 200,
      data: event,
    });
  });
};
