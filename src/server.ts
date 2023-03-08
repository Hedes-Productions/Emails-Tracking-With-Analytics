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

app.get("/sendEmail", (req: any, res: any) => {
  sendMail().then((result) => {
    console.log(`Email sent... ${JSON.stringify(result)}`);
    res.json(result);
  });
});
