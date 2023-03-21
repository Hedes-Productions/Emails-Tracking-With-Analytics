const { v4: clientUUID } = require("uuid");
const path = require("path");
const env = path.resolve(__dirname, "../../.env");

export const htmlTemplate = () => {
  const url = urlMaker();

  return `<body>
    <h1>Google Analytics Tracking Email</h1>
    <img src=${url} width="1" height="1" style="display:none"/>
</body>`;
};

const urlMaker = () => {
  let trackingID = process.env.FIREBASE_MEASUREMENT_ID;
  let clientID = clientUUID();
  let emailSubject = "Example Email";
  let hitType = "event";
  let eventCategory = "email";
  let eventAction = "open";

  // Build the Measurement Protocol URL
  return (
    "https://www.google-analytics.com/collect" +
    "?v=1" +
    "&tid=" +
    trackingID +
    "&cid=" +
    clientID +
    "&t=" +
    hitType +
    "&ec=" +
    eventCategory +
    "&ea=" +
    eventAction +
    "&el=" +
    encodeURIComponent(emailSubject)
  );
};
