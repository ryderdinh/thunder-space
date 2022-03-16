const Report = require("../../../models/Report");

module.exports = async (req, res, next) => {
  try {
    const report = await new Report({
      ...req.body,
      owner: req.user._id,
    });
    const validateReport = await report.validateSync();
    if (!validateReport) {
      return res.status(200).send({
        status: 200,
        data: await report.save(),
      });
    }
    return res.status(400).send({
      status: 400,
      error: "request is not validated",
    });
  } catch (error) {
    res.status(400).send({
      status: 400,
      error: "something went wrong",
    });
  }
};
