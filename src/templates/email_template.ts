const { v4: clientUUID } = require("uuid");
const path = require("path");
const env = path.resolve(__dirname, "../../.env");

export const htmlTemplate = () => {
  const url = urlMaker();

  return `
  <!DOCTYPE html>
  <html lang="en">
    <body>
        <h1>Google Analytics Tracking Email</h1>
        <img src=${url} width="10" height="10"/>
      </body>
  </html>
  `;
};
const urlMaker = () => {
  let measurementId = process.env.FIREBASE_MEASUREMENT_ID;
  let apiSecret = process.env.ANALYTICS_API_SECRET;
  let clientID = clientUUID();
  let emailSubject = "Example Email";
  let hitType = "event";
  let eventCategory = "Email";
  let eventAction = "Open";
  let appID = process.env.FIREBASE_APP_ID;
  return (
    "https://www.google-analytics.com/mp/collect?" +
    "firebase_app_id=" +
    appID +
    "&api_secret=" +
    apiSecret +
    "&t=" +
    hitType +
    "&ec=" +
    eventCategory +
    "&ea=" +
    eventAction +
    "&el=" +
    encodeURIComponent(emailSubject) +
    "&uid=" +
    clientID
  );
};
