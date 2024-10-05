import nodemailer from "nodemailer";
import dotenv from "dotenv";
import ejs from "ejs";
dotenv.config()

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

const sendToMail = async (
  to: string,
  subject: string,
  data: any,
  from: string = process.env.EMAIL!,
  template: string = "/requestOTP.ejs"
) => {
  ejs.renderFile(__dirname + template, data, (err, htmlData) => {
    const mailOptions = {
      from: from,
      to: to,
      subject: subject,
      html: htmlData,
    };

    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        console.log("Fail", err);
      } else {
        console.log("Success");
      }
    });
  });
};

export default sendToMail;
