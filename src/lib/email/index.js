import sgMail from "@sendgrid/mail";
import fs from "fs";

pathToAttachment = `${__dirname}/example.pdf`;
attachment = fs.readFileSync(pathToAttachment).toString("base64");

export const sendEmail = async (emailAddress) => {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: emailAddress,
      from: process.env.SENDER_EMAIL,
      subject: "Sending with Twilio SendGrid is Fun",
      text: "and easy to do anywhere, even with Node.js",
      attachments: [
        {
          content: attachment,
          filename: "example.pdf",
          type: "application/pdf",
          disposition: "attachment",
        },
      ],
      html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    };

    await sgMail.send(msg);
  } catch (error) {
    console.log(error);
    throw new Error("An error occurred while sending an email");
  }
};
