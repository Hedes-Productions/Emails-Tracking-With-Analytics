import { logEvent } from "./services/analytics_service";
import { sendMail } from "./services/email_service";

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});

app.get("/", (req: any, res: any) => {
  res.send(`Server running at ${PORT}`);
});

// This is the endpoint to send emails
app.get("/sendEmail", (req: any, res: any) => {
  sendMail().then((result) => {
    const logEventData = {
      clientId: "1234",
      eventName: "email_sent",
      parameters: {
        result: "email_success",
        emailID: result.messageId,
        // clientEmail: result.envelope.to[0],
      },
    };
    logEvent(logEventData);
    res.json(result);
  });
});
