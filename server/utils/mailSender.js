const nodemailer = require("nodemailer");
require('dotenv').config();

const mailSender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 465, // Use 465 for secure SSL/TLS connection
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS, // Use the app-specific password here
      },
      tls: {
        rejectUnauthorized: false,
      },
      timeout: 10000, // Increased timeout
    });

    let info = await transporter.sendMail({
      from: `"Study Notion" <${process.env.MAIL_USER}>`,
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    });

    console.log("Email sent:", info.response);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    return error;
  }
};

module.exports = mailSender;
