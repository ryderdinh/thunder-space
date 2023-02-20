const mongoose = require('mongoose')

const Schema = mongoose.Schema
const TimeSheet = new Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
  timeline: { type: Object }
})

module.exports = mongoose.model('Timesheet', TimeSheet)
