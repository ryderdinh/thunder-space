const Staff = require("../../../models/Staff");
module.exports = async (req, res) => {
  try {
    const _id = req.user._id;
    const user = await Staff.findById(_id);
    if (user) {
      const populateReports = await user.populate("reports");
      return res.status(200).send({
        status: 200,
        data: populateReports.reports.map((report) => report.reportDetails()),
      });
    }
    return res.status(401).send({
      status: 401,
      error: "unauthorized",
    });
  } catch (error) {
    res.status(400).send({
      status: 400,
      error: "something went wrong",
    });
  }
};
