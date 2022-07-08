const nodemailer = require("nodemailer")
const { OAuth2Client } = require("google-auth-library")

//init OAuth2Client with client id and client secret
const myOAuth2Client = new OAuth2Client(
    process.env.GOOGLE_MAILER_CLIENT_ID,
    process.env.GOOGLE_MAILER_CLIENT_SECRET
)
//set refresth token in OAuth2Client Credentials
myOAuth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_MAILER_REFRESH_TOKEN
})
module.exports = async function (mailOptions){
         //Get accesstoken from refresh token
    const accessTokenObject = await myOAuth2Client.getAccessToken();
    const myAccessToken = accessTokenObject.token;
    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAUTH2",
            user: process.env.ADMIN_EMAIL_ADDRESS,
            clientId: process.env.GOOGLE_MAILER_CLIENT_ID,
            clientSecret: process.env.GOOGLE_MAILER_CLIENT_SECRET,
            refreshToken: process.env.GOOGLE_MAILER_REFRESH_TOKEN,
            accessToken: myAccessToken
        }
    })
    return transport.sendMail(mailOptions)
}