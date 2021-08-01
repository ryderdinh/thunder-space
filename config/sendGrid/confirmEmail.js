const nodemailer = require("nodemailer")
const sendgridTransport = require("nodemailer-sendgrid-transport")

module.exports = nodemailer.createTransport(
    sendgridTransport({
    auth : {
        api_key: "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"
    }
}))