const Status = require("../../../models/status");

module.exports = (req, res) => {
  let userId = req.user.id;
  Status.findById(userId, (err, status) => {
    if (status !== undefined) {
      res.status(200).send({
        status: 200,
        data: status.timeLine,
      });
    } else {
      res.status(400).send({
        status: 400,
        error: "something went wrong",
      });
    }
  });
};
