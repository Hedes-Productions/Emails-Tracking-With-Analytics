const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const path = require("path");
const {htmlTemplate} = require("../templates/email_template");
const env = path.resolve(__dirname, "../../.env");

require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export const sendMail = async () => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "xcodexprojects@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
    const templateHTML = htmlTemplate()
    const mailOptions = {
      from: "XCodeX <xcodexprojects@gmail.com>",
      to: "tharindugimras@gmail.com",
      subject: "Email sending is working",
      // text: "Email service from Analytics_Test_Emails is working",
      html:templateHTML
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
};
