
const Status = require("../../../models/status");
const express = require("express");

const moment = require("moment");

module.exports = (req, res) => {
  let id = req.params.id;
  Status.findById(id, (err, status) => {
    if( status !== undefined) {
        res.json({ data: status.timeLine });
    }
  });
};

