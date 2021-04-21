import express from "express";
import { sendEmail } from "../lib/email/index.js";

const router = express.Router();

router.post("/email", async (req, res, next) => {
  try {
    await sendEmail("aliking743@gmail.com");
    res.send("Email sent!");
  } catch (error) {
    console.log(error);
  }
});

export default router;
