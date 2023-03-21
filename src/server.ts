import { logEvent } from "./services/analytics_service";
import { sendMail } from "./services/email_service";

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});

app.get("/", (req: any, res: any) => {
  res.send(`Server running at ${PORT}`);
});

app.get("/sendEmail", (req: any, res: any) => {
  sendMail().then((result) => {
    console.log(`Email sent... ${JSON.stringify(result)}`);
    const logEventData = {
      clientId: "1234",
      eventName: "email_sent",
      parameters: {
        result: "email_success",
      },
    };
    logEvent(logEventData);
    res.json(result);
  });
});
