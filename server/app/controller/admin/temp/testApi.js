const express = require("express")
const router = express.Router()
const path = require("path")
router.post("/testApi", async (req, res) => {
       return res.statusMessage
})

module.exports = router