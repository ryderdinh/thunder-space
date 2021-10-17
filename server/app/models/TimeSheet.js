const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TimeSheet = new Schema({
  dateDetails: [],
  confirmEmail: { type: Boolean, default: false },
  confirmEmailExpiration: { type: Date, default: Date.now() + 3600000 },
});

module.exports = mongoose.model("Timesheets", TimeSheet);
