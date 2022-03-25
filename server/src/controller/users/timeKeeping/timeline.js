const Status = require("../../../models/status");
const Response  = require("../../../models/Response")
module.exports = (req, res) => {
  let userId = req.user.id;
  Status.findById(userId, (err, status) => {
    if (status !== undefined) {
      res.status(200).send(new Response(200, "success", status.timeLine));
    } else {
      res.status(400).send(new Response(400, "something went wrong"));
    }
  });
};
