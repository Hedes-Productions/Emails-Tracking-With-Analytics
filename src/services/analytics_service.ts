const path = require("path");
const env = path.resolve(__dirname, "../../.env");
const fetch = require("node-fetch");

type logEventType = {
  clientId: string;
  eventName: string;
  parameters: object;
};

export const logEvent = async (params: logEventType) => {
  const { clientId, eventName, parameters } = params;
  const measurement_id = process.env.FIREBASE_MEASUREMENT_ID;
  const api_secret = process.env.ANALYTICS_API_SECRET;
  const res = await fetch(
    `https://www.google-analytics.com/mp/collect?measurement_id=${measurement_id}&api_secret=${api_secret}`,
    {
      method: "POST",
      body: JSON.stringify({
        client_id: clientId,
        events: [
          {
            name: eventName,
            params: parameters,
          },
          {
            name: 'test_event',
            params: parameters,
          },
          {
            name: 'test_event1',
            params: parameters,
          }
        ],
      }),
    }
  );
};
