import sgMail from "@sendgrid/mail";
import fs from "fs-extra";

import { fileURLToPath } from "url";
import { join, dirname } from "path";

const { readFile } = fs;
// import {dirname} from "path";

// pathToAttachment = `${__dirname}/example.pdf`;
// attachment = fs.readFileSync(pathToAttachment).toString("base64");

export const sendEmail = async (emailAddress) => {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const dataFolderPath = join(
      dirname(fileURLToPath(import.meta.url)),
      "../../data/pdf"
    );
    const attachment = join(dataFolderPath, "example.pdf");
    const pdfattachment = await readFile(attachment).toString("base64");

    console.log("this isFFF", dataFolderPath);

    const msg = {
      to: emailAddress,
      from: process.env.SENDER_EMAIL,
      subject: "Your Booking Number is....",
      text: "Dear MsMr Hope you enjoy with us",
      attachments: [
        {
          content: pdfattachment,
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
