import nodemailer from 'nodemailer';

require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: process.env.SMTP_SERVICE,
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_ID,
    pass: process.env.GMAIL_PASSWORD,
  },
});

export { transporter };

