const { env } = require("shelljs");
const Event = require("../../../models/Event");
const { convert } = require("../../../utils/dateFormat");
const Response = require("../../../models/Response")
module.exports = (req, res) => {
  Event.find({}, (err, event) => {
    if (err) {
      res.status(400).send(new Response(400, "someting went wrong"));
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
    res.status(200).send(new Response(200, "success", event));
  });
};
